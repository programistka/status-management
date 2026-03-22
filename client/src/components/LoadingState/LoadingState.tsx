const LoadingState = () => (
  <div className="px-8 py-12 flex flex-col items-center gap-3 text-gray-400">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    <p className="text-sm">Loading employees...</p>
  </div>
);

export default LoadingState;
