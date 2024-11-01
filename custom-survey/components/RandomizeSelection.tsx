import { ElementFactory, QuestionTagboxModel, Serializer } from "survey-core";
import {
  ReactQuestionFactory,
  SurveyQuestionTagbox,
  SvgIcon,
} from "survey-react-ui";
import React from "react";

const CUSTOM_TYPE = "randomize-selection";

export class RandomizerModel extends QuestionTagboxModel {
  getType() {
    return CUSTOM_TYPE;
  }

  get cssClasses() {
    console.log(this.cssClassesValue);
    return super.cssClasses;
  }

  get maxSelectedChoices() {
    return this.getPropertyValue("maxSelectedChoices");
  }

  set maxSelectedChoices(val) {
    this.setPropertyValue("maxSelectedChoices", val);
  }

  get randomSelectionCount() {
    return this.getPropertyValue("randomSelectionCount", 3);
  }

  set randomSelectionCount(val) {
    this.setPropertyValue("randomSelectionCount", val);
  }

  randomizeSelection() {
    const availableChoices = this.visibleChoices;
    const selectionCount = Math.min(
      this.randomSelectionCount,
      availableChoices.length
    );

    const shuffled = [...availableChoices]
      .sort(() => 0.5 - Math.random())
      .slice(0, selectionCount);

    this.value = shuffled.map((choice) => choice.value);
  }
}

export class Randomizer extends SurveyQuestionTagbox {
  constructor(props: any) {
    super(props);
  }

  renderRandomizeButton() {
    if (this.question.isReadOnly) return null;

    return (
      <button
        className={this.question.cssClasses.randomButton}
        onClick={() => this.question.randomizeSelection()}
      >
        Random Selection
      </button>
    );
  }

  createClearButton(): JSX.Element | null {
    if (
      !this.question.allowClear ||
      !this.question.cssClasses.cleanButtonIconId
    )
      return null;

    const style = { display: !this.question.showClearButton ? "none" : "" };
    return (
      <>
        {this.renderRandomizeButton()}
        <div
          className={this.question.cssClasses.cleanButton}
          style={style}
          onClick={this.clear}
          aria-hidden="true"
        >
          <SvgIcon
            className={this.question.cssClasses.cleanButtonSvg}
            iconName={this.question.cssClasses.cleanButtonIconId}
            title={this.question.clearCaption}
            size={"auto"}
          ></SvgIcon>
        </div>
      </>
    );
  }
}

export function registerRandomizer() {
  ElementFactory.Instance.registerElement(CUSTOM_TYPE, (name) => {
    return new RandomizerModel(name);
  });

  Serializer.addClass(
    CUSTOM_TYPE,
    [
      { name: "maxSelectedChoices:number", default: -1, category: "general" },
      { name: "randomSelectionCount:number", default: 3, category: "general" },
    ],
    function () {
      return new RandomizerModel("");
    },
    "tagbox"
  );

  ReactQuestionFactory.Instance.registerQuestion(CUSTOM_TYPE, (props) => {
    return React.createElement(Randomizer, props);
  });
}
