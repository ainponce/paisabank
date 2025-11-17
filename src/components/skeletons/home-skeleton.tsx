import { CardSkeleton } from "./card-skeleton";
import { TransactionSkeleton } from "./transaction-skeleton";

export const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      <div className="bg-white px-6 pt-8 pb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="h-4 w-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>

        <div className="mb-4">
          <CardSkeleton />
          <div className="flex justify-center gap-2 mt-4">
            <div className="h-2 w-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-3">
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
        </div>
      </div>
    </div>
  );
};

