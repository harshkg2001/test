import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

export const txnSlice = createSlice({
  name: "txn",
  initialState,
  reducers: {
    addToTxn: (state, action) => {
        state.transactions.unshift(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToTxn } = txnSlice.actions;

export default txnSlice.reducer;
