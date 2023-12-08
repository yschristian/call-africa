import { createAsyncThunk } from "@reduxjs/toolkit";
import { localUrl } from ".";
import axios from "axios";

const fetchMessages = createAsyncThunk(
  "messages/fetchAll",
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}message/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${localUrl}deleteMessage/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async (message, { rejectWithValue }) => {
    try {
      console.log(message);
      const res = await axios.post(`${localUrl}message/create`, message, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const getPhoneNumbers = createAsyncThunk(
  "messages/getPhoneNumbers",
  async (thunkAPI, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}telephone`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export default fetchMessages;
