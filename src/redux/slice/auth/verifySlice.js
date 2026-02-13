// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const verifyAdminOtp = createAsyncThunk(
//   "auth/verifyAdminOtp",
//   async ({ phone, otp }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "https://softwave-technify-be-2wbg.onrender.com/api/admin/login/login-admin/verify",
//         { phone, otp }
//       );
      
//       toast.success("Login Successful!");
//       return response.data;
//     } catch (error) {
//       const message = error.response?.data?.message || "Invalid OTP";
//       toast.error(message);
//       return rejectWithValue(message);
//     }
//   }
// );

// const verifySlice = createSlice({
//   name: "verify",
//   initialState: {
//     loading: false,
//     isVerified: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(verifyAdminOtp.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(verifyAdminOtp.fulfilled, (state) => {
//         state.loading = false;
//         state.isVerified = true;
//       })
//       .addCase(verifyAdminOtp.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default verifySlice.reducer;






import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const verifyAdminOtp = createAsyncThunk(
  "auth/verifyAdminOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/login/login-admin/verify`,
        { phone, otp }
      );

      // 🔹 Token ko localStorage mein save karna
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Admin data ko bhi stringify karke save kar sakte hain for persistence
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
      }

      toast.success("Login Successful!");
      return response.data; // { success, token, admin }
    } catch (error) {
      const message = error.response?.data?.message || "Invalid OTP";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState: {
    loading: false,
    isVerified: false,
    adminData: JSON.parse(localStorage.getItem("admin")) || null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      state.adminData = null;
      state.isVerified = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAdminOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAdminOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isVerified = true;
        state.adminData = action.payload.admin;
      })
      .addCase(verifyAdminOtp.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = verifySlice.actions;
export default verifySlice.reducer;