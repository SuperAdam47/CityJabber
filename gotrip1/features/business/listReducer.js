import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchData } from "../../services/business";
const initialState = {
  listData: [],
  status: false,
};

export const AllData = createAsyncThunk("list/search", async (sendData) => {
  const response = await getSearchData(sendData);
  return response;
});

export const ListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllData.pending, (state) => {
        state.status = true;
      })
      .addCase(AllData.fulfilled, (state, action) => {
        state.loading = false;
        state.listData = action.payload;
      })
      .addCase(AllData.rejected, (state) => {
        state.status = false;
      });
  },
});

export const ListReducer = ListSlice.reducer;
