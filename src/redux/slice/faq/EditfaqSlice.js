import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BASE = import.meta.env.VITE_API_BASE_URL;

export const editFaq = createAsyncThunk(
    "faq/editFaq",
    async ({ id, faqData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${BASE}/website/admin/faqs/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(faqData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const editFaqSlice = createSlice({
    name: "editfaq",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editFaq.pending, (state) => {
                state.loading = true;
            })
            .addCase(editFaq.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(editFaq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default editFaqSlice.reducer;
