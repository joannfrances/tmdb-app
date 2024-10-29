import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  icon?: {
    color: string;
    bgColor: string;
    svg: ReactNode;
  };
  actions?: ReactNode;
  disableClose?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  icon,
  actions,
  disableClose = false,
}: ModalProps) {
  if (!isOpen) return null;

  // Tailwind class groups for better organization
  const classes = {
    overlay: [
      "fixed inset-0",
      "transition-opacity",
      "bg-gray-500 dark:bg-gray-900",
      "bg-opacity-75 dark:bg-opacity-90",
    ].join(" "),
    
    modal: [
      "inline-block",
      "overflow-hidden",
      "text-left",
      "align-bottom",
      "transition-all transform",
      "bg-white dark:bg-gray-800",
      "rounded-lg",
      "shadow-xl",
      "sm:my-8",
      "sm:align-middle",
      "sm:max-w-lg",
      "sm:w-full",
    ].join(" "),

    content: [
      "px-6 pt-6 pb-5",
      "bg-white dark:bg-gray-800",
      "sm:p-8",
    ].join(" "),

    title: [
      "text-xl",
      "font-semibold",
      "leading-7",
      "text-gray-900 dark:text-white",
    ].join(" "),

    description: [
      "mt-3",
      "text-base",
      "leading-6",
      "text-gray-800 dark:text-gray-100",
      "font-normal",
    ].join(" "),

    actions: [
      "px-6 py-4",
      "bg-gray-50 dark:bg-gray-700/50",
      "sm:px-8",
    ].join(" "),

    iconWrapper: (bgColor: string) => [
      "flex items-center justify-center",
      "flex-shrink-0",
      "w-12 h-12",
      "mx-auto rounded-full",
      "sm:mx-0",
      "sm:h-10 sm:w-10",
      bgColor,
    ].join(" "),
  };

  return (
    // Modal Container
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className={classes.overlay}
          onClick={() => !disableClose && onClose()}
        />

        {/* Modal positioning trick */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal Content */}
        <div className={classes.modal}>
          <div className={classes.content}>
            <div className="sm:flex sm:items-start">
              {/* Icon */}
              {icon && (
                <div className={classes.iconWrapper(icon.bgColor)}>
                  <div className={icon.color}>{icon.svg}</div>
                </div>
              )}

              {/* Title and Description */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className={classes.title}>
                  {title}
                </h3>
                <div className={classes.description}>
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {actions && (
            <div className={classes.actions}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
