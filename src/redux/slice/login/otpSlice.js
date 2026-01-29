import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

// 🔹 VERIFY OTP API
export const verifyOtpApi = createAsyncThunk(
  "otp/verifyOtpApi",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      console.log("🔐 Verifying OTP with:", { phone, otp });

      const response = await axios.post(
        `${BASE}/admin/auth/login/verify-otp`,
        {
          phone: phone,
          otp: otp,
        }
      );

      console.log("Verification Success:", response.data);

      // Store token if exists
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        console.log("token is: ",response.data.token);

      }

      // Store user data if exists
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error(" Verification Error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: null,
  },

  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(verifyOtpApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtpApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyOtpApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;