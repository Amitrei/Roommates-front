import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../constants/api";
import { renderBlackOverlay, unRenderBlackOverlay } from "./globalsReducer";
const slice = createSlice({
  name: "transactions",
  initialState: { createTransaction: { render: false }, deleteTransaction: { render: false } },
  reducers: {
    renderedCreateTransaction: (state, action) => {
      state.createTransaction.render = true;
    },

    unrenderedCreateTransaction: (state, action) => {
      state.createTransaction.render = false;
    },

    renderedDeleteTransaction: (state, action) => {
      state.deleteTransaction.render = true;
    },

    unrenderedDeleteTransaction: (state, action) => {
      state.deleteTransaction.render = false;
    },

    categoriesRecieved: (state, action) => {
      state.categories = action.payload;
    },

    createdCategoryRecieved: (state, action) => {
      state.createTransaction.category = action.payload;
    },

    clearedCreateTransactionCategory: (state, action) => {
      state.createTransaction.category = null;
    },
  },
});

export const {
  categoriesRecieved,
  createdCategoryRecieved,
  renderedCreateTransaction,
  unrenderedCreateTransaction,
  renderedDeleteTransaction,
  unrenderedDeleteTransaction,
  clearedCreateTransactionCategory,
} = slice.actions;

// Action Creators
export const loadCategories = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${process.env.REACT_APP_API_MAIN_URL}/api/categories`,
      method: "get",
      onSuccess: categoriesRecieved.type,
    })
  );
};

export const renderCreateTransaction = () => (dispatch, getState) => {
  // black overlay
  dispatch(renderBlackOverlay({}));
  return dispatch(renderedCreateTransaction({}));
};

export const unRenderCreateTransaction = () => (dispatch, getState) => {
  dispatch(clearedCreateTransactionCategory({}));
  dispatch(unRenderBlackOverlay({}));
  return dispatch(unrenderedCreateTransaction({}));
};

export const renderDeleteTransaction = () => (dispatch, getState) => {
  dispatch(renderBlackOverlay({}));
  return dispatch(renderedDeleteTransaction({}));
};

export const unRenderDeleteTransaction = () => (dispatch, getState) => {
  dispatch(unRenderBlackOverlay({}));
  return dispatch(unrenderedDeleteTransaction({}));
};
export default slice.reducer;
