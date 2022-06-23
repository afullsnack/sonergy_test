export default ({ children }) => {
  return (
    <div className="flex flex-col justify-evenly max-w-screen-mobile bg-white rounded-xl shadow-md px-8 py-6 mx-auto my-0">
      {children}
    </div>
  );
};
