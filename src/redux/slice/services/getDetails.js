import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://softwave-technify-be.onrender.com/api/project/get";

export const fetchServiceDetails = createAsyncThunk(
  "serviceDetails/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/${id}`);
      return res.data.data; // 👈 only data object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch service details"
      );
    }
  }
);

const getDetailsSlice = createSlice({
  name: "serviceDetails",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearServiceDetails: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceDetails } = getDetailsSlice.actions;
export default getDetailsSlice.reducer;
