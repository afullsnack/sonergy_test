import { FaEyeSlash, FaUser } from "react-icons/fa";

export default function Input({ type = 'text', preIcon = <FaUser />, suffixIcon = <FaEyeSlash />, placeholder="Default text" }) {

  return (
    <div className="flex items-center justify-center h-12 w-[100%]">
      <div className="w-5 h-5 bg-transparent">
        {preIcon}
      </div>
      <input type={type} prefix={'PRE'} className="self-stretch" placeholder={placeholder} />
      <div className="w-5 h-5 bg-transparent flex items-center justify-center">
        {suffixIcon}
      </div>
    </div>
  );
}