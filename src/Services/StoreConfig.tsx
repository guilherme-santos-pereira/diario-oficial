import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meSlice from "./Slices/meSlice";

const reducer = combineReducers({
  meSlice,
});

export const store = configureStore({ reducer });
