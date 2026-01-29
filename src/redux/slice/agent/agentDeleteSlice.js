import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const deleteAgentById = createAsyncThunk(
  "agentDelete/deleteAgentById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${BASE}/admin/agent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      return id; // deleted agent id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete agent"
      );
    }
  }
);


const agentDeleteSlice = createSlice({
  name: "agentDelete",
  initialState: { loading: false, error: null, success: false },
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAgentById.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

        //  SUCCESS TOAST
        toast.success("Admin deleted successfully!",{
          autoClose:1000,
        });
      })
      .addCase(deleteAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;

        // ❌ ERROR TOAST
        toast.error(action.payload || "Failed to delete admin");
      });
  },
});

export const { resetDeleteState } = agentDeleteSlice.actions;
export default agentDeleteSlice.reducer;
