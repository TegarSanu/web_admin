const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-xs text-gray-500">
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin shadow-inner" />
        <div className="absolute inset-2 rounded-full bg-white/40 backdrop-blur-sm" />
      </div>
    </div>
  );
};

export default LoadingScreen;
