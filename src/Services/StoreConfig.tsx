import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meSlice from "./Slices/meSlice";
import allPostsSlice from "./Slices/allPostsSlice";
import publicSlice from "./Slices/publicSlice";
const reducer = combineReducers({
  meSlice,
  allPostsSlice,
  publicSlice,
});

export const store = configureStore({ reducer });
