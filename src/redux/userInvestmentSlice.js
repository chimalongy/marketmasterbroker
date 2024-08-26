// userInvestmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userInvestmentSlice = createSlice({
  name: 'userInvestments',
  initialState,
  reducers: {
    setUserInvestments: (state, action) => {
      return [...action.payload];
    },
    clearUserInvestments: () => {
      return initialState;
    },
    addUserInvestment: (state, action) => {
      state.push(action.payload);
    },
    removeUserInvestment: (state, action) => {
      return state.filter(Investment => Investment.id !== action.payload.id);
    },
  },
});

export const { setUserInvestments, clearUserInvestments, addUserInvestment, removeUserInvestment } = userInvestmentSlice.actions;

export default userInvestmentSlice.reducer;
