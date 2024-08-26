// features/userdataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountBalance: 0,
  totalProfits:0,
};

const userUtilsSlice = createSlice({
  name: 'userUtils',
  initialState,
  reducers: {
    setAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },
    setTotalProfits: (state, action) => {
      state.totalProfits = action.payload;
    },
  },
});

export const { setAccountBalance, setTotalProfits } = userUtilsSlice.actions;

export default userUtilsSlice.reducer;
