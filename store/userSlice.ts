import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await fetch('https://6777cdcb80a79bf91902fe27.mockapi.io/api/v1/user/1');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data;
  }
);


type initialStateTypes={
  data: {
    id: number;
    name: string;
    email: string;
    accountBalance: number;
    recentTransactions: {
      id: number;
      date: string;
      description: string;
      amount: number;
      type: string;
    }[];
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState:initialStateTypes = {
  data: null,
  status: 'idle',
  error: undefined
}

const userSlice = createSlice({
  name: 'user',
 initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer

