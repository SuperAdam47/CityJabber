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
  reducers: {
    initiateUser(state, action) {
      state.isLoggedIn = false
      state.user = action.payload.user

    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      if(action.payload.success) {
        state.user = action.payload.finalData.user;
        localStorage.setItem("jwt", action.payload.finalData.token);
      } else {
        throw new Error(action.payload.message)
      }
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const UserSlice = authSlice;
