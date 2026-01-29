import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchPayoutHistory = createAsyncThunk(
  "payoutHistory/fetchPayoutHistory",
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return rejectWithValue("Token not found. Please login again.");
      }

      const res = await axios.get(
        `${BASE}/admin/commission/payouts/history`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch payout history"
      );
    }
  }
);

const payoutHistorySlice = createSlice({
  name: "payoutHistory",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayoutHistory.fulfilled, (state, action) => {
  state.loading = false;

  // 🔥 SAFETY: ARRAY FORCE
  const payload = action.payload;

  if (Array.isArray(payload)) {
    state.history = payload;
  } else if (Array.isArray(payload.history)) {
    state.history = payload.history;
  } else if (Array.isArray(payload.data)) {
    state.history = payload.data;
  } else {
    state.history = [];
  }
});

  },
});

export default payoutHistorySlice.reducer;
