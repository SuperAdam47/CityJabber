import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecentData } from "../../services/business";
const initialState = {
  businessData: [],
  status: false,
};

export const AllData = createAsyncThunk("business/recentAll", async () => {
  const response = await getRecentData();
  return response;
});

export const RecentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllData.pending, (state) => {
        state.status = true;
      })
      .addCase(AllData.fulfilled, (state, action) => {
        state.loading = false;
        state.businessData = action.payload;
      })
      .addCase(AllData.rejected, (state) => {
        state.status = false;
      });
  },
});

export const RecentReducer = RecentSlice.reducer;
