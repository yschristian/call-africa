import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const token = localStorage.getItem("accessToken");
export const roleId = window.sessionStorage.getItem("roleId");

// export const localUrl = "http://localhost:4000/";
export const localUrl = "https://call-africa-api.onrender.com/";
export const baseURl = `${localUrl}api/v1/`;
export const api = axios.create({
  baseURL: `${localUrl}`,
  headers: { Authorization: `Bearer ${token}` },
});

export const refreshToken = async (expired = null) => {
  try {
    const res = await axios.post(`${localUrl}user/refresh`, {
      refreshTokenKey: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
  } catch (error) {
    expired && alert("Session Expired");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("auth");
    localStorage.removeItem("accessToken");
    // window.location = "/login";
  }
};

export const uploadImage = createAsyncThunk(
  "image/upload",
  async (file, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "hciadmin");
      data.append("cloud_name", "dpymyyo7h");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dpymyyo7h/image/upload`,
        data
      );

      return res.data.url;
    } catch (error) {
      if (error.response !== undefined) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export default baseURl;
