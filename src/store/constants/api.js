import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/ApiCallBegan");
export const apiCallSuccsess = createAction("api/ApiCallSuccsess");
export const apiCallFailed = createAction("api/ApiCallFailed");
