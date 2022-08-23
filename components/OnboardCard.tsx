export default function OnboardCard({ children, onClick }: any | undefined) {
  return (
    <div
      className="flex flex-col w-full justify-evenly desktop:w-screen-desktop bg-white dark:bg-slate-900 dark:text-gray-200 rounded-xl shadow-md px-4 py-6 mx-auto my-0 mb-2"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
