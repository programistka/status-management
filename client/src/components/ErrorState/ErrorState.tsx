import { useErrorBoundary } from "react-error-boundary";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const ErrorState = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="px-8 py-12 flex flex-col items-center gap-3">
      <ExclamationCircleIcon className="w-10 h-10 text-red-400" />
      <p className="text-sm font-medium text-gray-700">Failed to load employees</p>
      <p className="text-xs text-gray-400">Check your connection and try again.</p>
      <button
        onClick={resetBoundary}
        className="mt-2 px-4 py-1.5 text-sm text-blue-500 border border-blue-400 rounded hover:bg-blue-50 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorState;
