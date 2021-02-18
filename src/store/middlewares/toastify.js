import { toast } from "react-toastify";
import { toastNotifySuccess, toastNotifyFailure } from "./../constants/toastify";
export default (store) => (next) => (action) => {
  if (action.type === toastNotifySuccess.type) {
    toast(action.payload);
  } else if (action.type === toastNotifyFailure.type) {
    toast.error(action.payload);
  }

  next(action);
};
