import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.id = 9;
      state.username = "james";
    },
    logout: (state) => {
      state.id = initialState.id;
      state.username = initialState.username;
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
