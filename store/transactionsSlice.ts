import { Transaction } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data.slice(0, 10).map((item: Transaction) => ({
      id: item.id,
      date: new Date(Date.now() - Math.random() * 10000000000)
        .toISOString()
        .split("T")[0],
      description: item.title.slice(0, 30),
      amount: Math.floor(Math.random() * 1000),
      type: Math.random() > 0.5 ? "credit" : "debit",
    }));
  }
);

type initialStateTypes = {
  data: {
    id: number;
    type: string;
    date: string;
    description: string;
    amount: number;
  }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: initialStateTypes = {
  data: [],
  status: "idle",
  error: undefined,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
