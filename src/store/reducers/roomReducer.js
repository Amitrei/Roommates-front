import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";

const slice = createSlice({
  name: "room",
  initialState: { room: null },
  reducers: {
    roomRecieved: (state, action) => {
      state.room = action.payload;
    },

    roomCreated: (state, action) => {
      state.room = action.payload;
    },

    memberInvited: (state, action) => {
      state.room = action.payload;
    },

    transactionCreated: (state, action) => {
      state.room.totalExpenses += action.payload.amount;
      state.room.transactions.push(action.payload);
      state.roomTransactions.push(action.payload);
    },

    transactionsRecieved: (state, action) => {
      state.roomTransactions = action.payload;
    },
  },
});

export const {
  roomCreated,
  memberInvited,
  roomRecieved,
  transactionCreated,
  transactionsRecieved,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const createRoom = (data) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms`,
      method: "post",
      data,
      onSuccess: roomCreated.type,
      toastMessage: "Room Created",
    })
  );
};

export const inviteMember = (memberEmail) => (dispatch, getState) => {
  console.log(getState());
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${
        getState().entities.room.room._id
      }/members/${memberEmail}`,
      method: "post",
      data: {},
      onSuccess: memberInvited.type,
      toastMessage: "Member invited",
    })
  );
};

export const fetchRoomDetails = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${getState().auth.user.roomId}`,
      method: "get",
      data: {},
      onSuccess: roomRecieved.type,
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

export const getRoomTransactions = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/transactions/room/${
        getState().auth.user.roomId
      }`,
      method: "get",
      onSuccess: transactionsRecieved.type,
    })
  );
};
