import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./Slices/exampleSlice";

const reducer = combineReducers({
  exampleSlice,
});

export const store = configureStore({ reducer });
