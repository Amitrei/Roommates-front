import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./../constants/api";
import { renderBlackOverlay, unRenderBlackOverlay } from "./globalsReducer";
import { deleteNotification, userJoinedRoom, userLeftRoom } from "./authReducer";
const slice = createSlice({
  name: "room",
  initialState: {
    room: null,
    roomTransactions: [],
    filteredTransactions: [],
    detailedMembers: [],
    inviteMemberWindow: false,
    memberListWindow: false,
  },
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

    leftRoom: (state, action) => {
      const detailedMembersIdx = state.detailedMembers.findIndex(
        (member) => member.email === action.payload.email
      );

      state.detailedMembers.splice(detailedMembersIdx, 1);
      state.room = null;
    },

    memberRemoved: (state, action) => {
      const detailedMembersIdx = state.detailedMembers.findIndex(
        (member) => member.email === action.payload.email
      );

      state.detailedMembers.splice(detailedMembersIdx, 1);

      const memberIdx = state.room.members.findIndex(
        (member) => member.email === action.payload.email
      );
      state.room.members.splice(memberIdx, 1);
    },

    membersRecived: (state, action) => {
      state.detailedMembers = action.payload;
    },
    transactionCreated: (state, action) => {
      state.room.totalExpenses += action.payload.amount;
      state.room.transactions.push(action.payload._id);
      state.roomTransactions.push(action.payload);
    },

    transactionDeleted: (state, action) => {
      console.log(action.payload);
      const index = state.room.transactions.findIndex((t) => t === action.payload._id);
      console.log(index + "index");
      state.room.totalExpenses -= action.payload.amount;
      state.room.transactions.splice(index, 1);
      state.roomTransactions.splice(index, 1);
    },

    transactionsRecieved: (state, action) => {
      state.roomTransactions = action.payload;
    },

    transactionsFiltered: (state, action) => {
      state.filteredTransactions = action.payload;
    },

    filteredTransactionsCleared: (state, action) => {
      state.filteredTransactions = [];
    },

    openedMemberInviteWindow: (state, action) => {
      state.inviteMemberWindow = true;
    },

    closedMemberInviteWindows: (state, action) => {
      state.inviteMemberWindow = false;
    },

    openedMemberList: (state, action) => {
      state.memberListWindow = true;
    },

    closedMemberList: (state, action) => {
      state.memberListWindow = false;
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
  membersRecived,
  memberRemoved,
  openedMemberList,
  closedMemberList,
  leftRoom,
  transactionsFiltered,
  filteredTransactionsCleared,
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
      onSuccess: userJoinedRoom.type,
      toastMessage: "You joined the room",
    })
  );
};

export const getMembers = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${
        getState().auth.user.roomId
      }/members/`,
      method: "get",
      onSuccess: membersRecived.type,
    })
  );
};

export const removeMember = (memberEmail) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${
        getState().auth.user.roomId
      }/members/${memberEmail}`,
      method: "delete",
      onSuccess: memberRemoved.type,
      toastMessage: "Member removed succsessfuly",
    })
  );
};

export const leaveRoom = (memberEmail) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/rooms/${
        getState().auth.user.roomId
      }/leave/${memberEmail}`,
      method: "delete",
      onSuccess: leftRoom.type,
      toastMessage: "Member left room succsessfuly",
    })
  );

  return dispatch(userLeftRoom());
};

export const filterTransactions = (filteredTransactions) => (dispatch, getState) => {
  return dispatch(transactionsFiltered(filteredTransactions));
};

export const clearFilteredTransactions = () => (dispatch, getState) => {
  return dispatch(filteredTransactionsCleared());
};
export const openInviteMemberWindow = () => (dispatch, getState) => {
  dispatch(renderBlackOverlay());
  return dispatch(openedMemberInviteWindow());
};

export const closeInviteMemberWindow = () => (dispatch, getState) => {
  dispatch(unRenderBlackOverlay());
  return dispatch(closedMemberInviteWindows());
};

export const openMemberListWindow = () => (dispatch, getState) => {
  dispatch(renderBlackOverlay());
  return dispatch(openedMemberList());
};

export const closeMemberListWindow = () => (dispatch, getState) => {
  dispatch(unRenderBlackOverlay());
  return dispatch(closedMemberList());
};
