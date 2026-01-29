import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

// Fetch single agent by ID
export const fetchAgentById = createAsyncThunk(
  "agentView/fetchAgentById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE}/admin/agent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch agent"
      );
    }
  }
);

const agentViewSlice = createSlice({
  name: "agentView",
  initialState: {
    agent: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAgent: (state) => {
      state.agent = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgentById.fulfilled, (state, action) => {
        state.loading = false;
        state.agent = action.payload;
      })
      .addCase(fetchAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAgent } = agentViewSlice.actions;
export default agentViewSlice.reducer;
