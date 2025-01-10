"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  // MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";

export default function TransactionHistory() {
  const { data: transactions, status } = useSelector(
    (state: RootState) => state.transactions
  );
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  if (status === "loading") {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-gray-900 dark:text-white">
        Loading transactions...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-gray-900 dark:text-white">
        Error loading transactions
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredAndSortedTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesType = filterType === "all" || t.type === filterType;
        const matchesSearch =
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.amount.toString().includes(searchTerm);
        return matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return sortOrder === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return sortOrder === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        }
      });
  }, [transactions, filterType, searchTerm, sortBy, sortOrder]);

  // const toggleSortOrder = () => {
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Transaction History
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div>
            <label
              htmlFor="sortBy"
              className="mr-2 text-gray-700 dark:text-gray-300"
            >
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
              className="bg-white dark:bg-gray-700 rounded-md p-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            {/* <button
              onClick={toggleSortOrder}
              className="ml-2 bg-gray-200 dark:bg-gray-700 p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {sortOrder === "asc" ? (
                <ArrowUpIcon className="w-5 h-5" />
              ) : (
                <ArrowDownIcon className="w-5 h-5" />
              )}
            </button> */}
          </div>
          <div>
            <label
              htmlFor="filterType"
              className="mr-2 text-gray-700 dark:text-gray-300"
            >
              Filter by:
            </label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "all" | "credit" | "debit")
              }
              className="bg-white dark:bg-gray-700 rounded-md p-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            >
              <option value="all">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
        </div>
        <div className="relative flex sm:items-end">
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 dark:bg-gray-700 rounded-md p-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
          />
          {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                Date
              </th>
              <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                Description
              </th>
              <th className="p-3 text-right text-gray-700 dark:text-gray-200">
                Amount
              </th>
              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t border-gray-200 whitespace-nowrap dark:border-gray-700"
              >
                <td className="p-3 text-gray-800 whitespace-nowrap dark:text-gray-200">
                  {transaction.date}
                </td>
                <td className="p-3 text-gray-800 whitespace-nowrap dark:text-gray-200">
                  {transaction.description}
                </td>
                <td className="p-3 text-right text-gray-800 whitespace-nowrap dark:text-gray-200">
                  ${transaction.amount.toFixed(2)}
                </td>

                <td className="p-3 text-center">
                  {transaction.type === "credit" ? "Credit" : "Debit"}

                  {transaction.type === "credit" ? (
                    <ArrowUpIcon className="w-5 h-5 text-green-500 inline" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5 text-red-500 inline" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
