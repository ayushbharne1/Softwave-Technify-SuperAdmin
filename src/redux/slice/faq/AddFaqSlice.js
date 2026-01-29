import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = import.meta.env.VITE_API_BASE_URL;

export const addFaq = createAsyncThunk(
    "faqs/addFaq",
    async (faqData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(
                `${BASE}/website/admin/faqs`,
                {
                    method: "POST",
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

const faqSlice = createSlice({
    name: "faqs",
    initialState: {
        faqs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFaq.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFaq.fulfilled, (state, action) => {
                state.loading = false;
                state.faqs.push(action.payload);
            })
            .addCase(addFaq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default faqSlice.reducer;
