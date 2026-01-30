import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* FETCH SINGLE LEAD BY leadId */
export const fetchLeadDetails = createAsyncThunk(
  "leadDetails/fetchLeadDetails",
  async (leadId, { rejectWithValue }) => {
    try {
      if (!leadId) return rejectWithValue("LeadId is required");

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found");


      const response = await fetch(
        `https://softwave-technify-be.onrender.com/api/admin/lead/leadId/${leadId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to fetch lead");
      }

      return data.data; // single lead object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const leadDetailsSlice = createSlice({
  name: "leadDetails",
  initialState: {
    lead: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearLeadDetails: (state) => {
      state.lead = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.lead = action.payload;
      })
      .addCase(fetchLeadDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch lead details";
      });
  },
});

export const { clearLeadDetails } = leadDetailsSlice.actions;
export default leadDetailsSlice.reducer;
