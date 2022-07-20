import { MouseEventHandler, ReactNode } from "react";

type BtnSize = "normal" | "small";
type Icon = ReactNode | undefined | null;
type IconPosition = "right" | "left";
interface CustomButton {
  text: string;
  type: BtnSize;
  icon: Icon;
  iconPosition: IconPosition | undefined;
  block: boolean;
  isLoading: boolean;
  disabled: boolean | null;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ButtonPrimary = ({
  text = "Default Text",
  type = "normal",
  icon,
  iconPosition = "left",
  block,
  isLoading = false,
  disabled = false,
  onClick,
}: CustomButton) => {
  return (
    <button
      className={`bg-primary ${
        block ? "w-full" : null
      } rounded-lg flex items-center justify-center ${
        type === "normal" ? "mt-4 mb-4 py-[14px]" : "mt-2 mb-2 py-2"
      } px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all`}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`flex items-center justify-center ${
          iconPosition === "left" ? null : "flex-row-reverse"
        }`}
      >
        {!isLoading && (
          <>
            {typeof icon !== "undefined" ? icon : null}
            <span
              className={`text-white font-medium text-sm ${
                typeof icon !== "undefined"
                  ? iconPosition === "left"
                    ? "ml-2"
                    : "ml-2"
                  : null
              }`}
            >
              {text}
            </span>
          </>
        )}
        {isLoading && (
          <svg
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export const ButtonGhost = ({
  text,
  type = "normal",
  icon,
  iconPosition,
  block,
  disabled = false,
  onClick,
}: CustomButton) => {
  return (
    <button
      className={`bg-transparent ${
        block ? "w-full" : null
      } rounded-lg flex items-center justify-center ${
        type === "normal" ? "mt-2 mb-2 py-[14px]" : "mt-1 mb-1 py-2"
      } border-solid border-primary border-[1px] text-primary px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all`}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`flex items-center justify-center ${
          typeof iconPosition !== "undefined" && iconPosition === "left"
            ? null
            : "flex-row-reverse"
        }`}
      >
        {typeof icon !== "undefined" ? icon : null}
        {typeof text !== "undefined" ? (
          <span
            className={`text-primary font-medium text-sm ${
              typeof icon !== "undefined"
                ? iconPosition === "left"
                  ? "ml-2"
                  : "mr-2"
                : null
            }`}
          >
            {text}
          </span>
        ) : null}
      </div>
    </button>
  );
};

export const ButtonIcon = ({
  icon,
  block,
  type,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`bg-transparent ${
        block ? "w-full" : null
      } rounded-lg flex items-center justify-center ${
        type === "normal" ? "mt-2 mb-2 py-[14px]" : "mt-1 mb-1 py-2"
      } border-solid border-primary border-[1px] text-primary px-4 shadow-sm active:opacity-60 hover:opacity-50 transition-all`}
      onClick={onClick}
      disabled={disabled}
    >
      {typeof icon !== "undefined" ? icon : null}
    </button>
  );
};
