export const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 w-40 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded mb-1 animate-pulse"></div>
              <div className="h-3 w-36 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-3 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-3 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-3 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

