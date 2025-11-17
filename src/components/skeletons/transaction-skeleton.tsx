export const TransactionSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="text-right">
        <div className="h-4 w-20 bg-gray-200 rounded mb-2 ml-auto"></div>
        <div className="h-3 w-16 bg-gray-200 rounded ml-auto"></div>
      </div>
    </div>
  );
};

