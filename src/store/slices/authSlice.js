import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // action : { type: "auth/login",  payload : {id, username, name, email, password} }
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.id = initialState.id;
      state.username = initialState.username;
    },
  },
});

// action creator
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
