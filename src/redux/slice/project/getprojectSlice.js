// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "axios";

// // export const fetchProjectByType = createAsyncThunk(
// //     "project/fetchByType",
// //     async (projectType) => {
// //         const res = await axios.get(
// //             `https://aryo-be-1.onrender.com/api/project/type/${projectType}`
// //         );
// //         return res.data.data;
// //     }
// // );

// // const projectSlice = createSlice({
// //     name: "project",
// //     initialState: {
// //         list: [],
// //         projects: [],
// //         loading: false,
// //     },
// //     reducers: {},
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(fetchProjectByType.pending, (state) => {
// //                 state.loading = true;
// //             })
// //             .addCase(fetchProjectByType.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.projects = action.payload;
// //             })
// //             .addCase(fetchProjectByType.rejected, (state) => {
// //                 state.loading = false;
// //             });
// //     },
// // });

// // export default projectSlice.reducer;



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// /* =========================
//    🔹 GET PROJECT TYPES
// ========================= */
// export const fetchProjectTypes = createAsyncThunk(
//     "project/fetchProjectTypes",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await axios.get(
//                 "https://aryo-be-1.onrender.com/api/project/types/getall"
//             );
//             return res.data.data; // ["CREDIT_CARD", "DEMAT_ACCOUNT", ...]
//         } catch (err) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// /* =========================
//    🔹 GET PROJECT BY TYPE
// ========================= */
// export const fetchProjectsByType = createAsyncThunk(
//     "project/fetchByType",
//     async (projectType, { rejectWithValue }) => {
//         try {
//             const res = await axios.get(
//                 `https://aryo-be-1.onrender.com/api/project/type/${projectType}`
//             );
//             return res.data.data;
//         } catch (err) {
//             return rejectWithValue(err.response?.data || err.message);
//         }
//     }
// );

// const projectSlice = createSlice({
//     name: "project",
//     initialState: {
//         projectTypes: [],     // 👈 types list
//         projects: [],         // 👈 projects list
//         loadingTypes: false,
//         loadingProjects: false,
//         error: null,
//     },
//     reducers: {
//         clearProjects(state) {
//             state.projects = [];
//         },
//     },
//     extraReducers: (builder) => {
//         builder

//             /* ===== Project Types ===== */
//             .addCase(fetchProjectTypes.pending, (state) => {
//                 state.loadingTypes = true;
//             })
//             .addCase(fetchProjectTypes.fulfilled, (state, action) => {
//                 state.loadingTypes = false;
//                 state.projectTypes = action.payload;
//             })
//             .addCase(fetchProjectTypes.rejected, (state, action) => {
//                 state.loadingTypes = false;
//                 state.error = action.payload;
//             })

//             /* ===== Projects By Type ===== */
//             .addCase(fetchProjectsByType.pending, (state) => {
//                 state.loadingProjects = true;
//             })
//             .addCase(fetchProjectsByType.fulfilled, (state, action) => {
//                 state.loadingProjects = false;
//                 state.projects = action.payload;
//             })
//             .addCase(fetchProjectsByType.rejected, (state, action) => {
//                 state.loadingProjects = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { clearProjects } = projectSlice.actions;
// export default projectSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   🔹 GET PROJECT TYPES
========================= */
export const fetchProjectTypes = createAsyncThunk(
    "project/fetchProjectTypes",
    async (_, { rejectWithValue }) => {
        try {
            console.log("🚀 API CALL: fetchProjectTypes");

            const res = await axios.get(
                "https://aryo-be-1.onrender.com/api/project/types/getall"
            );

            console.log("✅ Project Types Response:", res.data.data);
            return res.data.data;
        } catch (err) {
            console.error("❌ fetchProjectTypes ERROR", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/* =========================
   🔹 GET PROJECT BY TYPE
========================= */
export const fetchProjectsByType = createAsyncThunk(
    "project/fetchProjectsByType",
    async (projectType, { rejectWithValue }) => {
        try {
            console.log("🚀 API CALL: fetchProjectsByType");
            console.log("➡️ projectType:", projectType);

            const res = await axios.get(
                `https://aryo-be-1.onrender.com/api/project/type/${projectType}`
            );

            console.log("✅ Projects Response:", res.data.data);
            return res.data.data;
        } catch (err) {
            console.error("❌ fetchProjectsByType ERROR", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    "project/fetchProjectById",
    async (projectId, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://aryo-be-1.onrender.com/api/project/${projectId}`
            );
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


const projectSlice = createSlice({
    name: "project",
    initialState: {
        projectTypes: [],
        projects: [],
        loadingTypes: false,
        loadingProjects: false,
        error: null,
        selectedProject: null,         // ye project by ID store karega
        loadingProjectById: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* ===== TYPES ===== */
            .addCase(fetchProjectTypes.pending, (state) => {
                console.log("⏳ fetchProjectTypes pending");
                state.loadingTypes = true;
            })
            .addCase(fetchProjectTypes.fulfilled, (state, action) => {
                console.log("🎯 fetchProjectTypes fulfilled");
                state.loadingTypes = false;
                state.projectTypes = action.payload;
            })

            /* ===== PROJECTS ===== */
            .addCase(fetchProjectsByType.pending, (state) => {
                console.log("⏳ fetchProjectsByType pending");
                state.loadingProjects = true;
            })
            .addCase(fetchProjectsByType.fulfilled, (state, action) => {
                console.log("🎯 fetchProjectsByType fulfilled");
                state.loadingProjects = false;
                state.projects = action.payload;
            })
            /* ===== PROJECT BY ID ===== */
            .addCase(fetchProjectById.pending, (state) => {
                state.loadingProjectById = true;
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loadingProjectById = false;
                state.selectedProject = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.loadingProjectById = false;
                state.error = action.payload;
            });

    },
});

export default projectSlice.reducer;

