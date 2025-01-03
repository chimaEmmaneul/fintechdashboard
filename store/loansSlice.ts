import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface Loan {
  id: number;
  amount: number;
  tenure: number;
  purpose: string;
  startDate: string;
  status: 'active' | 'completed' | 'defaulted';
}

interface LoansState {
  currentLoan: Loan | null;
  loanHistory: Loan[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async () => {
    const response = await fetch('https://6777cdcb80a79bf91902fe27.mockapi.io/api/v1/loan/1');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data;
  }
);

const initialState: LoansState = {
  currentLoan: null,
  loanHistory: [],
  status: 'idle',
  error: null,
}

const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    requestLoan: (state, action: PayloadAction<Loan>) => {
      if (state.currentLoan) {
        state.loanHistory.push(state.currentLoan)
      }
      state.currentLoan = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentLoan = action.payload.currentLoan
        state.loanHistory = action.payload.loanHistory
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch loans'
      })
  },
})

export const { requestLoan } = loansSlice.actions
export default loansSlice.reducer

