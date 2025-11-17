export const CardSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-lg p-6 h-48 animate-pulse">
      <div className="flex justify-between items-start mb-8">
        <div className="h-8 w-8 bg-gray-400 rounded"></div>
        <div className="h-6 w-16 bg-gray-400 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-400 rounded"></div>
        <div className="flex justify-between items-end">
          <div>
            <div className="h-4 w-24 bg-gray-400 rounded mb-2"></div>
            <div className="h-8 w-32 bg-gray-400 rounded"></div>
          </div>
          <div className="h-6 w-16 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

