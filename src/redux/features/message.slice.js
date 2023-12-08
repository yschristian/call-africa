import { createSlice } from "@reduxjs/toolkit";

import fetchMessages, {
  createMessage,
  deleteMessage,
} from "../../api/message.api";

const initialState = {
  isLoading: false,
  error: null,
  messages: {},
  message: "",
};

const messageSlicer = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.messages = {};
        state.message = "";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.messages = action.payload.data;
        state.message = "";
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.messages = {};
        state.message = "";
      })
      .addCase(createMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = "";
      })
      .addCase(deleteMessage.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.message = "";
      });
  },
});

export default messageSlicer.reducer;
