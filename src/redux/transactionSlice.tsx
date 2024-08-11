
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  name: string;
  transactionType: 'Income' | 'Expenses';
  amount: number;
}

export interface TransactionsState { 
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions.splice(action.payload, 1);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
