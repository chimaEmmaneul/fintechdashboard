'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { fetchLoans } from '../../store/loansSlice'
import LoanManagementPage from '../../components/LoanManagementPage'
import LoanManagementSkeleton from '../../components/LoanManagementSkeleton'

export default function LoansPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { status } = useSelector((state: RootState) => state.loans)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLoans())
    }
  }, [status, dispatch])

  if (status === 'loading' || status === 'idle') {
    return <LoanManagementSkeleton />
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Loan Management</h1>
      <LoanManagementPage />
    </div>
  )
}

