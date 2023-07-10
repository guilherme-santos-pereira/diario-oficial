import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface ExampleState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: ExampleState = {
  data: [],
  loading: false,
  error: false,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    getExample: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getExampleSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload.data;
    },
    getExampleFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getExample, getExampleSuccess, getExampleFailure } =
  exampleSlice.actions;

export default exampleSlice.reducer;

export const fetchExample =
  () =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "example/getExample"
        | "example/getExampleSuccess"
        | "example/getExampleFailure";
    }) => void
  ) => {
    dispatch(getExample());
    try {
      const response = await services.getExample();
      dispatch(getExampleSuccess(response));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getExampleFailure());
    }
  };
