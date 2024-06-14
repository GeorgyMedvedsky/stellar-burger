import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserThunk } from './actions';

type TAuthState = {
  data: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  loginUserError: any;
};

const initialState: TAuthState = {
  data: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  loginUserError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    logoutUser: (state) => {
      state.data = null;
    }
  },
  selectors: {
    selectUser: (state) => state.data,
    selectAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.loginUserError,
    selectIsLoading: (state) => state.loginUserRequest,
    selectIsAuthenticated: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  }
});

export const { authChecked, logoutUser } = userSlice.actions;
export const {
  selectUser,
  selectAuthChecked,
  selectError,
  selectIsLoading,
  selectIsAuthenticated
} = userSlice.selectors;
