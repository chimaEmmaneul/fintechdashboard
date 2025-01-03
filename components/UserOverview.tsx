"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const chartData = [
  { name: "Jan", balance: 5000 },
  { name: "Feb", balance: 5500 },
  { name: "Mar", balance: 6000 },
  { name: "Apr", balance: 5800 },
  { name: "May", balance: 6200 },
  { name: "Jun", balance: 6800 },
  { name: "Jul", balance: 3800 },
  { name: "Aug", balance: 1800 },
  { name: "Sept", balance: 4800 },
  { name: "Oct", balance: 1800 },
  { name: "Nov", balance: 2800 },
  { name: "Dec", balance: 8800 },
];

export default function UserOverview() {
  const { data: userData, status } = useSelector(
    (state: RootState) => state.user
  );
  const [chartPeriod, setChartPeriod] = useState("6M");

  if (status === "loading") {
    return <UserOverviewSkeleton />;
  }

  if (status === "failed") {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-gray-900 dark:text-white">
        Error loading user data
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-gray-900 dark:text-white">
        No user data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome back, {userData.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Account Balance
            </h3>
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${userData.accountBalance.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              User Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-800 dark:text-gray-200">
                Name:
              </strong>{" "}
              {userData.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-800 dark:text-gray-200">
                Email:
              </strong>{" "}
              {userData.email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white  overflow-x-auto dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row  p-4 sm:p-6 justify-between items-start sm:items-center mb-4">
          <h3 className="text-xl font-semibold mb-2 sm:mb-0 text-gray-900 dark:text-white">
            Balance History
          </h3>
          <div className="flex flex-wrap gap-2">
            {["1M", "3M", "6M", "1Y"].map((period) => (
              <button
                key={period}
                onClick={() => setChartPeriod(period)}
                className={`px-3 py-1 rounded ${
                  chartPeriod === period
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="pr-2 min-w-[574px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: " bg-white dark:#1F2937",
                  border: "none",
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
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
              {userData.recentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3 text-gray-800 whitespace-nowrap dark:text-gray-200">
                    {transaction.date}
                  </td>
                  <td className="p-3 text-gray-800 whitespace-nowrap dark:text-gray-200">
                    {transaction.description}
                  </td>
                  <td className="p-3 text-right text-gray-800 whitespace-nowrap dark:text-gray-200">
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="p-3 text-center">
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
    </div>
  );
}

function UserOverviewSkeleton() {
  return (
    <div className="space-y-6 mx-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
