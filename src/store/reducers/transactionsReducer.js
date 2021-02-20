import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../constants/api";

const slice = createSlice({
  name: "transactions",
  initialState: { createTransaction: {} },
  reducers: {
    categoriesRecieved: (state, action) => {
      state.categories = action.payload;
    },

    createdCategoryRecieved: (state, action) => {
      state.createTransaction.category = action.payload;
    },
  },
});

export const { categoriesRecieved, createdCategoryRecieved } = slice.actions;

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

export default slice.reducer;
