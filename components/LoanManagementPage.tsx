"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoanManagement from "./LoanManagement";

export default function LoanManagementPage() {
  const { loanHistory } = useSelector((state: RootState) => state.loans);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Loan Management
        </h2>
        <LoanManagement />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Loan History
        </h3>
        {loanHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                    Amount
                  </th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                    Tenure
                  </th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                    Purpose
                  </th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                    Start Date
                  </th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loanHistory.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      ${loan.amount.toFixed(2)}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {loan.tenure} months
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {loan.purpose}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200">
                      {loan.startDate}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          loan.status === "completed"
                            ? "bg-green-500 text-white"
                            : loan.status === "defaulted"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-gray-900"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-200">
            No loan history available.
          </p>
        )}
      </div>
    </div>
  );
}
