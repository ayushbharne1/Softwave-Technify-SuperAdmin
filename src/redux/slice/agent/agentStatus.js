import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const toggleAgentStatus = createAsyncThunk(
  "agentStatus/toggleAgentStatus",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${BASE}/admin/agent/toggle-status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend se updated agent aa raha hoga
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Status update failed"
      );
    }
  }
);

const agentStatusSlice = createSlice({
  name: "agentStatus",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleAgentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAgentStatus.fulfilled, (state) => {
        state.loading = false;

        
        toast.success("Status updated successfully!",{
          autoClose:1500
        });
      })
      .addCase(toggleAgentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        // ❌ ERROR TOAST
        toast.error(action.payload || "Status update failed");
      });
  },
});

export default agentStatusSlice.reducer;
