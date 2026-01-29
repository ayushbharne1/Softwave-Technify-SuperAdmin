import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;


export const sendOtp = createAsyncThunk(
  "login/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE}/admin/auth/login/send-otp`,
        {
          phone: phone, 
        }
      );

      // Return both response data and the phone number
      return {
        ...response.data,
        mobile: phone, // Store phone number for OTP verification
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    otp: null,
    mobile: null, // Add mobile field
    error: null,
  },
  reducers: {
    clearLoginData: (state) => {
      state.otp = null;
      state.mobile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload?.otp;
        state.mobile = action.payload?.mobile; // Store mobile number
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;