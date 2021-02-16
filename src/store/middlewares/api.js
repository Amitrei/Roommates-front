import { apiCallBegan, apiCallSuccsess, apiCallFailed } from "./../constants/api";
import axios from "axios";
export default ({ dispatch }) => (next) => async (action) => {
  if (action.type === apiCallBegan.type) {
    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        url,
        method,
        data,
        withCredentials: true,
      });

      dispatch(apiCallSuccsess({}));

      const payload = response.data._doc ? response.data._doc : response.data;

      if (onSuccess) {
        return dispatch({ type: onSuccess, payload });
      }
    } catch (error) {
      return dispatch(apiCallFailed(error.response.data));
    }
  }

  next(action);
};
