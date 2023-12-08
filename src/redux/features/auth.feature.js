import { createSlice } from "@reduxjs/toolkit";
import register, {
  forgotPassword,
  loginUser,
  resetPassword,
} from "../../api/userApi";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
};

const loginInitialState = {
  isLoading: false,
  error: null,
  user: {},
  message: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: loginInitialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.user = null;
      state.message = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = {
          ...action.payload.userData,
          accessToken: action.payload.token,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.user = null;
        state.message = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = null;
      });
  },
});

export const { logout, removeMessage } = loginSlice.actions;

export default {
  loginReducer: loginSlice.reducer,
};
