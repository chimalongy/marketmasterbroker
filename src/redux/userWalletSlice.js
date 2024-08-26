// userWalletslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userWalletslice = createSlice({
  name: 'userWallets',
  initialState,
  reducers: {
    setUserWallets: (state, action) => {
      return [...action.payload];
    },
    clearUserWallets: () => {
      return initialState;
    },
    addUserWallet: (state, action) => {
      state.push(action.payload);
    },
    removeUserWallet: (state, action) => {
      return state.filter(wallet => wallet.id !== action.payload.id);
    },
  },
});

export const { setUserWallets, clearUserWallets, addUserWallet, removeUserWallet } = userWalletslice.actions;

export default userWalletslice.reducer;
