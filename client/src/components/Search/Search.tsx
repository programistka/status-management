const Search = () => {
  return (
    <div className="flex items-center gap-0 mb-8 bg-white rounded-lg shadow-sm">
      <button className="flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors shrink-0 rounded-l-lg">
        Create
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>

      <div className="flex items-center gap-2 px-4 flex-1">
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Type to search"
          className="flex-1 py-3.5 text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
        />
      </div>

      <div className="w-px h-8 bg-gray-200 shrink-0" />

      <div className="px-4 py-3.5 flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 focus:outline-none whitespace-nowrap">
        Filter by status
        <svg
          className={`w-4 h-4 transition-transform}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Search;
