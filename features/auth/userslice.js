import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register_me, login_me } from "../../services/auth";

export const register = createAsyncThunk("auth/register", async (formdata) => {
  try {
    const response = await register_me(formdata);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await login_me(formData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: {},
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("jwt", action.payload.finalData.token);
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const UserReducer = authSlice.reducer;
