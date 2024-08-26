// features/userdataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
};

const userdataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    setUserdata: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserdata: (state) => {
      return initialState;
    },
  },
});

export const { setUserdata, clearUserdata } = userdataSlice.actions;

export default userdataSlice.reducer;
