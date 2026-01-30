import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchAgentDetails = createAsyncThunk(
    "agentKyc/fetchList",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(
                "https://softwave-technify-be.onrender.com/api/admin/agent/kyc/requests",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);

            return data; // ✅ array
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/* =========================
   APPROVE / REJECT KYC
========================= */
export const approveAgentKyc = createAsyncThunk(
    "agentKyc/updateStatus",
    async ({ agentId, approved, rejectionReason }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");

            const res = await fetch(
                `https://aryo-be-1.onrender.com/api/admin/agent/kyc-approval/${agentId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        approved,
                        rejectionReason,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);

            return data.data; // updated agent
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const agentKycSlice = createSlice({
    name: "agentKyc",
    initialState: {
        list: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
        },
        selectedAgent: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedAgent: (state, action) => {
            state.selectedAgent = action.payload;
        },
        clearSelectedAgent: (state) => {
            state.selectedAgent = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgentDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAgentDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
                state.pagination = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    total: action.payload.total,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(fetchAgentDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(approveAgentKyc.fulfilled, (state, action) => {
                const updated = action.payload;
                state.list = state.list.map((a) =>
                    a._id === updated._id ? updated : a
                );
                state.selectedAgent = updated;
            })

    },
});

export const { setSelectedAgent, clearSelectedAgent } = agentKycSlice.actions;
export default agentKycSlice.reducer;
