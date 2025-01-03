import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import transactionsReducer from './transactionsSlice'
import sidebarSlice from "./sidebarSlice"
import loansReducer from './loansSlice'
import { fetchUserData } from './userSlice'
import { fetchTransactions } from './transactionsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    loans: loansReducer,
    sidebar:sidebarSlice
  },
})

// Dispatch fetch actions after store creation
store.dispatch(fetchUserData())
store.dispatch(fetchTransactions())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

