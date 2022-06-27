export default ({ children }: any) => {
  return (
    <div className="flex flex-col justify-evenly desktop:max-w-screen-desktop mobile:max-w-screen-mobile bg-white rounded-xl shadow-md px-8 py-6 mx-auto my-0">
      {children}
    </div>
  );
};
