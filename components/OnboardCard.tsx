export default ({ children }: any) => {
  return (
    <div className="flex flex-col w-full justify-evenly desktop:w-screen-desktop bg-white rounded-xl shadow-md px-4 py-6 mx-auto my-0 mb-2">
      {children}
    </div>
  );
};
