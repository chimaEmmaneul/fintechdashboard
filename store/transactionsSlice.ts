import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    // Simulating API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1500))
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      description: `Transaction ${index + 1}`,
      amount: Math.floor(Math.random() * 1000),
      type: Math.random() > 0.5 ? 'credit' : 'debit'
    }))
  }
)

type initialStateTypes = {
  data: {id:number,type:string, date:string, description:string, amount:number}[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined
}

const initialState: initialStateTypes = {
  data: [],
  status: 'idle',
  error: undefined,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default transactionsSlice.reducer

