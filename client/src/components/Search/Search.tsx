import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useQuery, useSetQuery } from "@/context/FiltersContext";

const Search = () => {
  const query = useQuery();
  const setQuery = useSetQuery();

  return (
    <div className="flex items-center gap-2 px-4 flex-1">
      <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Type to search"
        className="flex-1 py-3.5 text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
      />
      {query && (
        <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 cursor-pointer">
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Search;
