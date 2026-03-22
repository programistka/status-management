const Header = () => (
  <header className="px-8 py-4 flex items-center justify-between bg-white">
    <h1 className="text-2xl font-bold text-blue-500">Employees</h1>
    <button className="px-4 py-1.5 border border-blue-400 text-blue-500 rounded text-sm hover:bg-blue-50 transition-colors cursor-pointer">
      Log Out
    </button>
  </header>
);

export default Header;
