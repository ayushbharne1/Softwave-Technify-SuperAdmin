import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ---------------- ASYNC API CALL ---------------- */
export const createProject = createAsyncThunk(
  "project/createProject",
  async (formData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found.");

      const response = await axios.post(
        "https://softwave-technify-be.onrender.com/api/project/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server Error");
    }
  }
);

/* ---------------- SLICE ---------------- */
const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetProjectState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
