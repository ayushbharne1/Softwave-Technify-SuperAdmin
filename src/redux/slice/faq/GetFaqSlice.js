import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE = import.meta.env.VITE_API_BASE_URL;

// 🔹 GET FAQ API
export const getFaqs = createAsyncThunk(
    "faq/getFaqs",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("🔐 Token:", token);

            const res = await axios.get(
                `${BASE}/website/settings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(" Full API Response:", res.data);
            console.log(" FAQs:", res.data?.data?.faqs);

            return res.data.data.faqs;
        } catch (err) {
            console.log(" API Error:", err.response);
            return rejectWithValue(
                err.response?.data?.message || "Something went wrong"
            );
        }
    }
);


const faqSlice = createSlice({
    name: "faq",
    initialState: {
        faqs: [],
        loading: false,
        error: null,
    },
    reducers: {
        removeFaq: (state, action) => {
            state.faqs = state.faqs.filter(
                (faq) => faq._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFaqs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFaqs.fulfilled, (state, action) => {
                state.loading = false;
                state.faqs = action.payload;
            })
            .addCase(getFaqs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { removeFaq } = faqSlice.actions;
export default faqSlice.reducer;
