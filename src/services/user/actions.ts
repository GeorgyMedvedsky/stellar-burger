import { TLoginData, getUserApi, loginUserApi, logoutApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { authChecked, logoutUser } from './slice';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: Omit<TLoginData, 'name'>, { rejectWithValue }) => {
    const res = await loginUserApi(data);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi().finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
      dispatch(logoutUser());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
