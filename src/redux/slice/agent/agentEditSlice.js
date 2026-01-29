import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const updateAgent = createAsyncThunk(
  "agentEdit/updateAgent",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${BASE}/admin/agent/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update agent"
      );
    }
  }
);

const agentEditSlice = createSlice({
  name: "agentEdit",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetEditState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;

    
        toast.success("Admin updated successfull!",{
          autoClose:1500
        });
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        toast.error(action.payload || "Failed to Update admin");
      });
  },
});

export const { resetEditState } = agentEditSlice.actions;
export default agentEditSlice.reducer;
