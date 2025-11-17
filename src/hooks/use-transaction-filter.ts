"use client";

import { useState, useMemo } from "react";

interface Transaction {
  id: number;
  title: string;
  amount: string;
  transactionType: string;
  date: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  userId?: number;
}

export const useTransactionFilter = (transactions: Transaction[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (activeFilter) {
      filtered = filtered.filter(
        (transaction) => transaction.transactionType === activeFilter
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((transaction) =>
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [transactions, activeFilter, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredTransactions,
  };
};

