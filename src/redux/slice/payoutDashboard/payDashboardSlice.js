import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchPayoutDashboard = createAsyncThunk(
  "payoutDashboard/fetchPayoutDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return rejectWithValue("Token not found. Please login again.");
      }

      const res = await axios.get(
        `${BASE}/admin/commission/payouts/dasboard`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Authentication failed"
      );
    }
  }
);

const payoutDashboardSlice = createSlice({
  name: "payoutDashboard",
  initialState: {
    dashboard: null,
    agents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayoutDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload?.dashboard || null;
        state.agents = action.payload?.agents || [];
      })
      .addCase(fetchPayoutDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default payoutDashboardSlice.reducer;
