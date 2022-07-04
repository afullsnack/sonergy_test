import { HTMLInputTypeAttribute, ReactNode } from "react";

interface InputProps {
  type: HTMLInputTypeAttribute | undefined;
  preIcon: ReactNode | null;
  suffixIcon: ReactNode | null;
  placeholder: string | undefined;
}

export default function Input({
  type = "text",
  preIcon,
  suffixIcon,
  placeholder = "Default text",
}: InputProps) {
  return (
    <div className="flex items-center justify-center h-12 w-[100%] border-gray-200 border-[1px] border-solid px-3 py-4 rounded-md">
      <div className="w-5 h-5 bg-transparent mr-2">{preIcon}</div>
      <input
        type={type}
        prefix={"PRE"}
        className="self-stretch border-none outline-none text-sm"
        placeholder={placeholder}
      />
      <div className="w-5 h-5 ml-2 bg-transparent flex items-center justify-center">
        {suffixIcon}
      </div>
    </div>
  );
}
