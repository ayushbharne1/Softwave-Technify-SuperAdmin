import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

// admin create agent

export const postAgent = createAsyncThunk(
  "agent/postAgent",
  async (agentData, { rejectWithValue }) => {
    try {
      console.log("Sending agent data:", agentData); 

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BASE}/admin/agent/complete-profile`,
        agentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("API error:", error.response?.data);
      console.log("Validation errors:", error.response?.data.errors);
      
      return rejectWithValue(
        error.response?.data || { message: error.message || "Something went wrong" }
      );
    }
  }
);


const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agent = action.payload;
      })
      .addCase(postAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // keep as object
      });
  },
});

export default agentSlice.reducer;
