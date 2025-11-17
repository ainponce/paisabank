import { TransactionSkeleton } from "./transaction-skeleton";

export const MovimientosSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      <div className="bg-white px-6 pt-8 pb-6">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>

        <div className="relative mb-4">
          <div className="h-11 w-full bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <div className="flex gap-2 pb-2">
          <div className="h-10 w-24 bg-gray-200 rounded-2xl flex-shrink-0 animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-2xl flex-shrink-0 animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-2xl flex-shrink-0 animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-2xl flex-shrink-0 animate-pulse"></div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-3">
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
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

