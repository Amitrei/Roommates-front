import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";
import { renderBlackOverlay, unRenderBlackOverlay } from "./globalsReducer";
import { deleteNotification } from "./authReducer";
const slice = createSlice({
  name: "room",
  initialState: { room: null, roomTransactions: [], inviteMemberWindow: false },
  reducers: {
    roomRecieved: (state, action) => {
      state.room = action.payload;
    },

    joinedRoom: (state, action) => {
      state.room = action.payload;
    },

    roomCreated: (state, action) => {
      state.room = action.payload;
    },

    memberInvited: (state, action) => {
      state.room.invitedMembers.push(action.payload);
    },

    transactionCreated: (state, action) => {
      state.room.totalExpenses += action.payload.amount;
      state.room.transactions.push(action.payload._id);
      state.roomTransactions.push(action.payload);
    },

    transactionDeleted: (state, action) => {
      const index = state.room.transactions.findIndex((t) => t._id === action.payload._id);
      state.room.totalExpenses -= action.payload.amount;
      state.room.transactions.splice(index, 1);
      state.roomTransactions.splice(index, 1);
    },

    transactionsRecieved: (state, action) => {
      state.roomTransactions = action.payload;
    },

    openedMemberInviteWindow: (state, action) => {
      state.inviteMemberWindow = true;
    },

    closedMemberInviteWindows: (state, action) => {
      state.inviteMemberWindow = false;
    },
  },
});

export const {
  roomCreated,
  memberInvited,
  roomRecieved,
  transactionCreated,
  transactionsRecieved,
  transactionDeleted,
  openedMemberInviteWindow,
  closedMemberInviteWindows,
  joinedRoom,
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
      }/invite/${memberEmail}`,
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

export const deleteTranscation = (transactionId) => (dispatch, getState) => {
  console.log("inside delete", transactionId);
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/transactions/${
        getState().auth.user.roomId
      }/${transactionId}`,
      method: "delete",
      onSuccess: transactionDeleted.type,
      toastMessage: "Transaction deleted successfuly",
    })
  );
};

export const joinRoom = (roomId, notificationId) => (dispatch, getState) => {
  dispatch(deleteNotification(notificationId));
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${roomId}/members/${
        getState().auth.user.email
      }`,
      method: "post",
      onSuccess: joinedRoom.type,
      toastMessage: "You joined the room",
    })
  );
};

export const openInviteMemberWindow = () => (dispatch, getState) => {
  dispatch(renderBlackOverlay());
  return dispatch(openedMemberInviteWindow());
};

export const closeInviteMemberWindow = () => (dispatch, getState) => {
  dispatch(unRenderBlackOverlay());
  return dispatch(closedMemberInviteWindows());
};
