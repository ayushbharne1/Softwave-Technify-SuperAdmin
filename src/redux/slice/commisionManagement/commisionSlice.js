import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

/* ================= FETCH AGENTS ================= */
export const fetchCommissionAgents = createAsyncThunk(
  "commission/fetchAgents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE}/admin/commission/agents/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // IMPORTANT
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    agents: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateAdjustment: (state, action) => {
      const { id, value } = action.payload;
      const agent = state.agents.find((a) => a.id === id);
      if (agent) agent.adjustment = value;
    },
    lockAgent: (state, action) => {
      const agent = state.agents.find((a) => a.id === action.payload);
      if (agent) agent.locked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommissionAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommissionAgents.fulfilled, (state, action) => {
        state.loading = false;

        state.agents = action.payload.map((item) => ({
          id: item.agentId,
          name: item.agentName,
          approvedLeads: item.approvedLeads,
          commissionPerLead:
            item.approvedLeads > 0
              ? Math.floor(item.totalCommission / item.approvedLeads)
              : 0,
          totalCommission: item.totalCommission,
          adjustment: 0,
          locked: !item.eligibleForPayout,
        }));
      })
      .addCase(fetchCommissionAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateAdjustment, lockAgent } = commissionSlice.actions;
export default commissionSlice.reducer;
