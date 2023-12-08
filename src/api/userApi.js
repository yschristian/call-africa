import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localUrl } from ".";

const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}auth/signup`, user);
      return res.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}auth/signin`, user);
      localStorage.setItem("accessToken", res.data.data.token);
      return res.data.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}user/all`, {
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

export const getOneUser = createAsyncThunk(
  "user/getOneUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}user/${id}`, {
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

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${localUrl}deleteuser/${id}`, {
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}forgotPassword`, email);
      return res.data;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue({ message: error.response.data.error });
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${localUrl}reset/${token}`, {
        email,
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

export default register;
