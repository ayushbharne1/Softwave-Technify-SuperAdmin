import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* GET LEADS API */
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found.");

      const response = await fetch(
        "https://softwave-technify-be.onrender.com/api/admin/lead",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue("Failed to fetch leads");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* UPDATE LEAD STATUS API */
export const updateLeadStatus = createAsyncThunk(
  "leads/updateLeadStatus",
  async ({ leadId, status, reason }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found.");

      const response = await fetch(
        `https://aryo-be-1.onrender.com/api/admin/lead/${leadId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to update status");
      }

      return data; // updated lead
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* SLICE */
const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH LEADS */
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      /* UPDATE STATUS */
      .addCase(updateLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.leads.findIndex(
          (lead) => lead._id === action.payload._id
        );

        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update lead status";
      });
  },
});

export default leadSlice.reducer;
