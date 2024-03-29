import { MouseEventHandler, useEffect, useState } from "react";

export const ToastSuccess = ({
  text,
  close,
}: {
  text: string;
  close: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      id="toast-success"
      className="flex sticky bottom-32 z-50 right-0 left-0 items-center p-4 mb-4 mx-4 my-auto text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={close}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export const ToastDanger = ({
  text,
  close,
}: {
  text: string;
  close: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      id="toast-danger"
      className="flex sticky bottom-32 z-50 right-0 left-0 items-center p-4 mb-4 mx-4 my-auto text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
        onClick={close}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export const ToastWarning = ({
  text,
  close,
}: {
  text: string;
  close: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      id="toast-warning"
      className="flex sticky bottom-32 z-50 right-0 left-0 items-center p-4 mx-4 my-auto text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-warning"
        aria-label="Close"
        onClick={close}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export interface ToastType {
  error: ({ text }: { text: string }) => void;
  success: ({ text }: { text: string }) => void;
  warning: ({ text }: { text: string }) => void;
}
export function useToast() {
  enum AlertType {
    Error = "error",
    Success = "success",
    Warning = "warning",
  }

  const [visible, setVisible] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string | undefined>();
  const [alertType, setAlertType] = useState<AlertType>(AlertType.Error);

  const error = ({ text }: { text: string }) => {
    setDisplayText((_prev) => text);
    setVisible(true);
    setAlertType(AlertType.Error);

    console.error("This shit should throw damn");

    // return <ToastDanger text={text} />;
  };

  const success = ({ text }: { text: string }) => {
    setDisplayText((_prev) => text);
    setVisible(true);
    setAlertType(AlertType.Success);

    // return <ToastSuccess text={text} />;
  };
  const warning = ({ text }: { text: string }) => {
    setDisplayText((_prev) => text);
    setVisible(true);
    setAlertType(AlertType.Error);

    // return <ToastWarning text={text} />;
  };

  useEffect(() => {
    const toastTimeout = window.setTimeout(
      () => setVisible((_prev) => false),
      6000
    );
    console.log("Setting timeout", toastTimeout);

    return () => {
      window.clearTimeout(toastTimeout);
      console.log("Clear timeout");
    };
  }, [visible]);

  return [
    {
      error,
      success,
      warning,
    },
    () => (
      <>
        {alertType === AlertType.Error && visible && (
          <ToastDanger
            text={displayText}
            close={() => setVisible((_prev) => false)}
          />
        )}
        {alertType === AlertType.Success && visible && (
          <ToastSuccess
            text={displayText}
            close={() => setVisible((_prev) => false)}
          />
        )}
        {alertType === AlertType.Warning && visible && (
          <ToastWarning
            text={displayText}
            close={() => setVisible((_prev) => false)}
          />
        )}
      </>
    ),
  ] as [ToastType, () => JSX.Element];
}
