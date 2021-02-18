import { createAction } from "@reduxjs/toolkit";

export const toastNotifySuccess = createAction("toastNotifySuccess");
export const toastNotifyFailure = createAction("toastNotifyFailure");
