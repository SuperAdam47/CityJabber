import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    city: "",
    category: "",
    categoryLevel: [],
    state: "",
};

const keySlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        initiateSearchKey(state, action) {
            console.log('action==>', action.payload)
            state.city = action.payload.city
            state.categoryLevel = action.payload.categoryLevel
            state.categoryLevel = action.payload.categoryLevel
            state.state = action.payload.state
        }
    },
});

export const SearchSlice = keySlice;
