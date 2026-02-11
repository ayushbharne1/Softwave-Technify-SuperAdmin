import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE = import.meta.env.VITE_API_BASE_URL;

// DELETE FAQ API
export const deleteFaq = createAsyncThunk(
    "faq/deleteFaq",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.delete(
                `${BASE}/website/admin/faqs/${id}`,

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Delete failed");
        }
    }
);

const deleteFaqSlice = createSlice({
    name: "deleteFaq",
    initialState: { loading: false, error: null, success: false },

    reducers: {
        resetDelete: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteFaq.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFaq.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteFaq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetDelete } = deleteFaqSlice.actions;
export default deleteFaqSlice.reducer;
