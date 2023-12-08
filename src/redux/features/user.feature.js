import { createSlice } from "@reduxjs/toolkit";
import register, { getOneUser, getUsers, removeUser } from "../../api/userApi";
import { getPhoneNumbers } from "../../api/message.api";

const initialState = {
  isLoading: false,
  error: null,
  users: {},
  phoneNumbers: null,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (state, payload) => {
      state.users = payload.payload;
    },
    addPhoneNumber: (state, action) => {
      state.phoneNumbers = Array.from(new Set(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = "";
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.users = {};
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload.data;
        state.message = "";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.users = {};
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = "";
      })
      .addCase(getPhoneNumbers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
        state.phoneNumbers = null;
      })
      .addCase(getPhoneNumbers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.phoneNumbers = action.payload;
      })
      .addCase(getPhoneNumbers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = "";
        state.phoneNumbers = null;
      });
  },
});

export const { loggedInUser, addPhoneNumber } = userSlice.actions;

export default userSlice.reducer;
