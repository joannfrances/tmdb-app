import { ITheme } from "survey-core";

const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeJson: ITheme = {
  backgroundOpacity: 1,
  isPanelless: true,
  cssVariables: {
    // General colors
    "--sjs-general-backcolor": isDarkMode
      ? "rgba(18, 18, 18, 1)"
      : "rgba(255, 255, 255, 1)",
    "--sjs-general-backcolor-dim": isDarkMode
      ? "rgb(102 102 102 / 50%)"
      : "rgb(255 255 255)",
    "--sjs-general-forecolor": isDarkMode
      ? "rgba(255, 255, 255, 0.91)"
      : "rgba(0, 0, 0, 0.91)",
    "--sjs-general-dim-forecolor": isDarkMode
      ? "rgba(255, 255, 255, 0.91)"
      : "rgba(0, 0, 0, 0.91)",

    // Primary colors
    "--sjs-primary-backcolor": isDarkMode ? "rgba(0, 0, 0, 1)" : "rgb(0, 0, 0)",
    "--sjs-primary-forecolor": isDarkMode
      ? "rgba(255, 255, 255, 1)"
      : "rgb(255 255 255)",

    // Secondary colors
    "--sjs-secondary-backcolor": isDarkMode
      ? "rgba(255, 152, 20, 1)"
      : "rgba(255, 152, 20, 0.1)",
    "--sjs-secondary-forecolor": isDarkMode
      ? "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 1)",

    // Shadows
    "--sjs-shadow-small": isDarkMode
      ? "inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)"
      : "inset 0px 0px 0px 2px rgba(0, 0, 0, 1)",
    "--sjs-shadow-small-reset": "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.03)",
    "--sjs-shadow-medium": isDarkMode
      ? "0px 2px 6px 0px rgba(255, 255, 255, 0.1)"
      : "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
    "--sjs-shadow-large": isDarkMode
      ? "0px 8px 16px 0px rgba(255, 255, 255, 0.1)"
      : "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
    "--sjs-shadow-inner": "0px 1px 0px 0px rgba(0, 0, 0, 0.25)",
    "--sjs-shadow-inner-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.03)",

    // Borders
    "--sjs-border-default": isDarkMode
      ? "rgba(255, 255, 255, 0.16)"
      : "rgba(0, 0, 0, 0.16)",
    "--sjs-border-inside": "rgba(244, 244, 244, 0.908)",

    // Special colors
    "--sjs-special-red": "rgba(229, 10, 62, 1)",
    "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)",
    "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-special-green": "rgba(25, 179, 148, 1)",
    "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
    "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-special-blue": "rgba(67, 127, 217, 1)",
    "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
    "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
    "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
    "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",

    // Article font styles
    "--sjs-article-font-xx-large-textDecoration": "none",
    "--sjs-article-font-xx-large-fontWeight": "700",
    "--sjs-article-font-xx-large-fontStyle": "normal",
    "--sjs-article-font-xx-large-fontStretch": "normal",
    "--sjs-article-font-xx-large-letterSpacing": "0",
    "--sjs-article-font-xx-large-lineHeight": "64px",
    "--sjs-article-font-xx-large-paragraphIndent": "0px",
    "--sjs-article-font-xx-large-textCase": "none",
    "--sjs-article-font-x-large-textDecoration": "none",
    "--sjs-article-font-x-large-fontWeight": "700",
    "--sjs-article-font-x-large-fontStyle": "normal",
    "--sjs-article-font-x-large-fontStretch": "normal",
    "--sjs-article-font-x-large-letterSpacing": "0",
    "--sjs-article-font-x-large-lineHeight": "56px",
    "--sjs-article-font-x-large-paragraphIndent": "0px",
    "--sjs-article-font-x-large-textCase": "none",
    "--sjs-article-font-large-textDecoration": "none",
    "--sjs-article-font-large-fontWeight": "700",
    "--sjs-article-font-large-fontStyle": "normal",
    "--sjs-article-font-large-fontStretch": "normal",
    "--sjs-article-font-large-letterSpacing": "0",
    "--sjs-article-font-large-lineHeight": "40px",
    "--sjs-article-font-large-paragraphIndent": "0px",
    "--sjs-article-font-large-textCase": "none",
    "--sjs-article-font-medium-textDecoration": "none",
    "--sjs-article-font-medium-fontWeight": "700",
    "--sjs-article-font-medium-fontStyle": "normal",
    "--sjs-article-font-medium-fontStretch": "normal",
    "--sjs-article-font-medium-letterSpacing": "0",
    "--sjs-article-font-medium-lineHeight": "32px",
    "--sjs-article-font-medium-paragraphIndent": "0px",
    "--sjs-article-font-medium-textCase": "none",
    "--sjs-article-font-default-textDecoration": "none",
    "--sjs-article-font-default-fontWeight": "400",
    "--sjs-article-font-default-fontStyle": "normal",
    "--sjs-article-font-default-fontStretch": "normal",
    "--sjs-article-font-default-letterSpacing": "0",
    "--sjs-article-font-default-lineHeight": "28px",
    "--sjs-article-font-default-paragraphIndent": "0px",
    "--sjs-article-font-default-textCase": "none",

    // Editor styles
    "--sjs-font-editorfont-placeholdercolor": isDarkMode
      ? "rgba(255, 255, 255, 1)"
      : "rgba(0, 0, 0, 1)",
    "--sjs-font-editorfont-size": "14px",
    "--sjs-editor-background": isDarkMode
      ? "rgba(18, 18, 18, 1)"
      : "rgba(255, 255, 255, 1)",
    "--sjs-editorpanel-backcolor": "rgba(255, 255, 255, 0)",
    "--sjs-editorpanel-hovercolor": "rgba(255, 255, 255, 1)",
    "--sjs-editorpanel-cornerRadius": "0px",
    "--sjs-font-editorfont-weight": "600",

    // Page title styles
    "--sjs-font-pagetitle-size": "16px",

    // Question styles
    "--sjs-question-background": isDarkMode
      ? "rgba(18, 18, 18, 1)"
      : "rgba(255, 255, 255, 1)",
    "--sjs-questionpanel-cornerRadius": "8px",
    "--sjs-font-pagetitle-color": "rgba(0, 0, 0, 1)",
    "--sjs-font-editorfont-color": isDarkMode
      ? "rgba(255, 255, 255, 1)"
      : "rgba(0, 0, 0, 1)",
    "--sjs-font-questiontitle-color": isDarkMode
      ? "rgba(255, 255, 255, 1)"
      : "rgba(0, 0, 0, 0.6)",
    "--sjs-font-surveytitle-weight": "800",
    "--sjs-font-pagetitle-weight": "600",
    "--sjs-font-questiontitle-size": "14px",
    "--sjs-font-questiondescription-size": "14px",
    "--sjs-font-questiontitle-weight": "400",
    "--sjs-questionpanel-hovercolor": "rgba(119, 119, 119, 1)",
    "--sjs-header-backcolor": "transparent",
    "--sjs-font-headerdescription-color": isDarkMode
      ? "rgba(255, 255, 255, 0.45)"
      : "rgba(0, 0, 0, 0.45)",
    "--sjs-font-headerdescription-size": "14px",
  },
  themeName: "default",
  colorPalette: isDarkMode ? "dark" : "light",
};
