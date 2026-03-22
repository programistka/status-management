interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const Search = ({ query, onQueryChange }: SearchProps) => (
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
      value={query}
      onChange={({ target }) => onQueryChange(target.value)}
      placeholder="Type to search"
      className="flex-1 py-3.5 text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
    />
  </div>
);

export default Search;