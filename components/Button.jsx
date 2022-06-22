export default ({ text = "Default Text", onClick }) => {
  return (
    <button
      className="bg-primary rounded-lg flex items-center justify-center mt-4 py-[14px] shadow-sm active:opacity-50 transition-all"
      onClick={onClick}
    >
      <span className="text-white font-medium text-sm">{text}</span>
    </button>
  );
};
