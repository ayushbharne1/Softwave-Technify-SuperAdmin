import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import revenueLogo from "../../../assets/aryoLogo.png";
const BASE = import.meta.env.VITE_API_BASE_URL;

export const defaultSettingData = {
  websiteName: "Revenue Hub Official Website",
  description: "Revenue Hub is a digital platform for managing agents and services.",
  logo: { url: revenueLogo },
  contactEmail: "support@revenuehub.com",
  contactPhone: "9876543210",
  socialLinks: {
    facebook: "https://facebook.com/azyoofficial",
    instagram: "https://instagram.com/aryoofficial",
    twitter: "https://twitter.com/aryoofficial",
    linkedin: "https://linkedin.com/company/aryo",
    youtube: "https://youtube.com/@aryoofficial"
  },
  aboutUs: "Revenue Hub is a growing platform focused on secure and reliable digital services."
};

// PUT Settings
export const putSettings = createAsyncThunk(
  "setting/putSettings",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Token not found.");

      const response = await axios.put(
        `${BASE}/website/admin/settings`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Return only the updated settings
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating settings");
    }
  }
);

// GET Settings
export const getSettings = createAsyncThunk(
  "setting/getSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://aryo-be-1.onrender.com/api/website/settings"
      );
      //Return only the settings object
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch settings");
    }
  }
);

// Slice
const initialState = {
  data: defaultSettingData,
  loading: false,
  error: null
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
    updateLogo: (state, action) => {
      if (!state.data.logo) state.data.logo = {};
      state.data.logo.url = action.payload;
    },
    updatedSocialLink: (state, action) => {
      const { key, value } = action.payload;
      if (!state.data.socialLinks) state.data.socialLinks = {};
      state.data.socialLinks[key] = value;
    },
    setSettingData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || defaultSettingData;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(putSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putSettings.fulfilled, (state, action) => {
        state.loading = false;
        // Use returned data directly
        state.data = action.payload || state.data;
      })
      .addCase(putSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, updateLogo, updatedSocialLink, setSettingData } = settingSlice.actions;
export default settingSlice.reducer;
