import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../constants/api";

const slice = createSlice({
  name: "transactions",
  initialState: {},
  reducers: {
    roomTransactionsRecieved: (state, action) => {
      state.roomTransactions = action.payload;
    },

    transactionCreated: (state, action) => {
      state.roomTransactions.push(action.payload);
    },
  },
});

export const { roomTransactionsRecieved, transactionCreated } = slice.actions;

// Action Creators

export const getRoomTransactions = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/transactions/room/${
        getState().auth.user.roomId
      }`,
      method: "get",
      onSuccess: roomTransactionsRecieved.type,
    })
  );
};

export const createTransaction = (transaction) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/transactions/${getState().auth.user.roomId}`,
      method: "post",
      data: transaction,
      onSuccess: transactionCreated.type,
      toastMessage: "transaction submitted",
    })
  );
};
export default slice.reducer;
