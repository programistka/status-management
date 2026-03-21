export const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white">
      <h1 className="text-2xl font-bold text-blue-500">Employees</h1>
      <button className="border border-gray-300 text-gray-600 text-sm px-4 py-1.5 rounded hover:bg-gray-50">
        Log Out
      </button>
    </header>
  );
};
