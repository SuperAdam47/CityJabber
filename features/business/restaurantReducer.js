import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurantData } from "../../services/business";
const initialState = {
  businessData: [],
  status: false,
};

export const AllData = createAsyncThunk("business/restaurantAll", async () => {
  const response = await getRestaurantData();
  return response;
});

export const RestarantSlice = createSlice({
  name: "restaurant",
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

export const RestaruantReducer = RestarantSlice.reducer;
