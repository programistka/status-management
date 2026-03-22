import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

const Search = ({ query, onQueryChange }: SearchProps) => (
  <div className="flex items-center gap-2 px-4 flex-1">
    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
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