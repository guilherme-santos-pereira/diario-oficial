import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./Slices/exampleSlice";
import meSlice from "./Slices/meSlice";

const reducer = combineReducers({
  exampleSlice,
  meSlice,
});

export const store = configureStore({ reducer });
