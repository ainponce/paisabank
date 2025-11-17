"use client";

import { useEffect, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import { TransactionItem } from "@/components/transaction-item";
import { BottomNav } from "@/components/bottom-nav";
import { MovimientosSkeleton } from "@/components/skeletons/movimientos-skeleton";
import { ErrorState } from "@/components/error-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTransactionFilter } from "@/hooks/use-transaction-filter";

export default function MovimientosPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);

  const {
    data: transactionsData,
    isLoading,
    error,
  } = trpc.movements.getAll.useQuery();

  const transactions = transactionsData?.data || [];

  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTransactions,
  } = useTransactionFilter(transactions);

  const checkScrollIndicators = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    setShowLeftIndicator(scrollLeft > 10);
    
    setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollIndicators();
    window.addEventListener("resize", checkScrollIndicators);
    return () => window.removeEventListener("resize", checkScrollIndicators);
  }, []);

  if (isLoading) {
    return <MovimientosSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error al cargar movimientos"
        message="No pudimos cargar tus movimientos. Por favor, intenta nuevamente."
      />
    );
  }

  const filters = [
    { label: "Todos", value: null },
    { label: "Debito Aut.", value: "SUS" },
    { label: "Recibido", value: "CASH_IN" },
    { label: "Enviado", value: "CASH_OUT" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      <div className="bg-white px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-gray-900 mb-6">
          Movimientos
        </h1>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Ingresa un nombre o servicio"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full rounded-xl border-0 bg-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            onScroll={checkScrollIndicators}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          >
            {filters.map((filter) => (
              <Button
                key={filter.label}
                onClick={() => setActiveFilter(filter.value)}
                variant="ghost"
                className={`whitespace-nowrap rounded-2xl px-6 flex-shrink-0 border-0 shadow-sm ${
                  activeFilter === filter.value
                    ? "bg-[#707070] text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
          {showLeftIndicator && (
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
          )}
          {showRightIndicator && (
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                transactionType={transaction.transactionType}
                date={transaction.date}
                showDate={true}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <p className="text-center text-gray-500">
                No se encontraron movimientos
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

