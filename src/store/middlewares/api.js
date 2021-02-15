import { apiCallBegan } from "./../constants/api";
import { userReceived } from "../reducers/authReducer";
import axios from "axios";
export default ({ dispatch }) => (next) => async (action) => {
  if (action.type === apiCallBegan.type) {
    next(action);
    const response = await axios.get(action.payload.url, { withCredentials: true });
    if (response) {
      return dispatch(userReceived(response.data._doc));
    }

    console.log("apicallBegan");
  }

  console.log("ouside of if");
  next(action);
};
