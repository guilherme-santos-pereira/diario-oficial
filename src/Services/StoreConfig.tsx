import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meSlice from "./Slices/meSlice";
import AllPostsSlice from "./Slices/allPostsSlice";

const reducer = combineReducers({
  meSlice,
  AllPostsSlice,
});

export const store = configureStore({ reducer });
