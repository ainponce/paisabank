"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { CardCarousel } from "@/components/card-carousel";
import { TransactionItem } from "@/components/transaction-item";
import { BottomNav } from "@/components/bottom-nav";
import { SearchPopup } from "@/components/search-popup";
import { NotificationsPopup } from "@/components/notifications-popup";
import { HomeSkeleton } from "@/components/skeletons/home-skeleton";
import { ErrorState } from "@/components/error-state";
import { Bell, Search } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
  } = trpc.cards.getAll.useQuery();

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = trpc.movements.getLast.useQuery();

  if (cardsLoading || transactionsLoading) {
    return <HomeSkeleton />;
  }

  if (cardsError || transactionsError) {
    return <ErrorState />;
  }

  const cards = cardsData?.data || [];
  const transactions = transactionsData?.data || [];

  return (
    <div className="min-h-screen bg-[#F9FAFC] pb-24">
      <div className="bg-white px-6 pt-8 pb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">Hola</p>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-gray-900">
              Paisanx
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Abrir búsqueda"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
              aria-label="Ver notificaciones"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <CardCarousel cards={cards} />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Últimos movimientos
          </h2>
          <button
            onClick={() => router.push("/movimientos")}
            className="text-sm text-blue-600 font-medium"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                title={transaction.title}
                amount={transaction.amount}
                transactionType={transaction.transactionType}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <p className="text-center text-gray-500">
                No hay movimientos recientes
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      
      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      
      <NotificationsPopup
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
