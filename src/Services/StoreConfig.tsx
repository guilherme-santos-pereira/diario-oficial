import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meSlice from "./Slices/meSlice";
import publicSlice from "./Slices/publicSlice";

const reducer = combineReducers({
  meSlice,
  publicSlice,
});

export const store = configureStore({ reducer });
