import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface diaryState {
  data: any[];
  loading: boolean;
  error: boolean;
}

interface Body {
  file: any;
  post_type: string;
  date: string;
  hour: string;
  number: string;
}

const initialState: diaryState = {
  data: [],
  loading: false,
  error: false,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    getDiary: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getDiarySuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getDiaryFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getDiary, getDiarySuccess, getDiaryFailure } =
  diarySlice.actions;

export default diarySlice.reducer;

export const fetchDiary =
  (body: Body) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "diary/getDiary"
        | "diary/getDiarySuccess"
        | "diary/getDiaryFailure";
    }) => void
  ) => {
    dispatch(getDiary());
    try {
      const response = await services.postDiary(body);
      dispatch(getDiarySuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getDiaryFailure());
    }
  };
