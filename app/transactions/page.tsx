'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { fetchTransactions } from '../../store/transactionsSlice'
import TransactionHistory from '../../components/TransactionHistory'
import TransactionHistorySkeleton from '../../components/TransactionHistorySkeleton'

export default function TransactionsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { status } = useSelector((state: RootState) => state.transactions)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions())
    }
  }, [status, dispatch])

  if (status === 'loading' || status === 'idle') {
    return <TransactionHistorySkeleton />
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Transaction History</h1>
      <TransactionHistory />
    </div>
  )
}

