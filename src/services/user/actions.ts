import {
  TLoginData,
  getOrderByNumberApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  refreshToken
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { authChecked } from './slice';

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

export const getUserThunk = createAsyncThunk('auth/getUser', getUserApi);
export const refreshTokenThunk = createAsyncThunk('refreshToken', refreshToken);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        await dispatch(getUserThunk());
      } catch (error: any) {
        if (error.message === 'jwt expired') {
          await dispatch(refreshTokenThunk());
          await dispatch(getUserThunk());
        } else {
          throw error;
        }
      } finally {
        dispatch(authChecked());
      }
    } else {
      dispatch(authChecked());
    }
  }
);

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
});

export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrder',
  async (n: number) => getOrderByNumberApi(n)
);

export const getUserOrdersThunk = createAsyncThunk(
  'orders/getAll',
  getOrdersApi
);
