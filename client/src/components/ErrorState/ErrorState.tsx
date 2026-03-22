import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const ErrorState = () => (
  <div className="px-8 py-12 flex flex-col items-center gap-3">
    <ExclamationCircleIcon className="w-10 h-10 text-red-400" />
    <p className="text-sm font-medium text-gray-700">Failed to load employees</p>
    <p className="text-xs text-gray-400">Check your connection and try refreshing the page.</p>
  </div>
);

export default ErrorState;
