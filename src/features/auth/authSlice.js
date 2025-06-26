// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "./authAPI"; // Import the loginAPI function

export const loginUser = createAsyncThunk(
  "auth/loginUser", // The name of the action
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the API to login
      const data = await loginAPI({ email, password });

      // Save user info to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data; // Return the response data to be used in the fulfilled state
    } catch (err) {
      // If there's an error, return the error message as the rejected value
      return rejectWithValue(err.response?.data?.message || "Login failed!");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
