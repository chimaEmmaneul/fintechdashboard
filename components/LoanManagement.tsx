"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { requestLoan } from "../store/loansSlice";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export default function LoanManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const currentLoan = useSelector(
    (state: RootState) => state.loans.currentLoan
  );

  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      requestLoan({
        amount: Number(loanAmount),
        tenure: Number(loanTenure),
        purpose: loanPurpose,
        id: 0,
        startDate: "",
        status: "active",
      })
    );
    setLoanAmount("");
    setLoanTenure("");
    setLoanPurpose("");
  };

  return (
    <div className="bg-white dark:bg-gray-800  rounded-xl ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Current Loan
          </h3>
          {currentLoan ? (
            <>
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="w-8 h-8 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${currentLoan.amount.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Tenure: {currentLoan.tenure} months
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Purpose: {currentLoan.purpose}
              </p>
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No active loan</p>
          )}
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Request New Loan
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="loanAmount"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
              >
                Loan Amount
              </label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-white dark:bg-gray-600 rounded-md p-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="loanTenure"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
              >
                Loan Tenure (months)
              </label>
              <input
                type="number"
                id="loanTenure"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full bg-white dark:bg-gray-600 rounded-md p-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="loanPurpose"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
              >
                Loan Purpose
              </label>
              <input
                type="text"
                id="loanPurpose"
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                className="w-full bg-white dark:bg-gray-600 rounded-md p-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Request Loan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
