// userTransactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userTransactionSlice = createSlice({
  name: 'userTransactions',
  initialState,
  reducers: {
    setUserTransactions: (state, action) => {
      return [...action.payload];
    },
    clearUserTransactions: () => {
      return initialState;
    },
    addUserTransaction: (state, action) => {
      state.push(action.payload);
    },
    removeUserTransaction: (state, action) => {
      return state.filter(transaction => transaction.id !== action.payload.id);
    },
  },
});

export const { setUserTransactions, clearUserTransactions, addUserTransaction, removeUserTransaction } = userTransactionSlice.actions;

export default userTransactionSlice.reducer;
