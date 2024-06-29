import { configureStore } from '@reduxjs/toolkit';
import {
  authChecked,
  resetOrderState,
  selectUser,
  selectAuthChecked,
  selectError,
  selectIsLoading,
  selectIsAuthenticated,
  selectOrderModalData,
  selectOrderRequest,
  selectUserOrders,
  selectOrder,
  userSlice
} from './slice';
import { expect, test, describe, jest } from '@jest/globals';
import {
  loginUserThunk,
  getUserThunk,
  checkUserAuth,
  updateUserThunk,
  logoutUserThunk,
  createOrderThunk,
  getOrderByNumberThunk,
  getUserOrdersThunk
} from './actions';
import * as api from '../../utils/burger-api';

jest.mock('../../utils/burger-api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn(),
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn(),
  getOrdersApi: jest.fn()
}));
const registerData = {
  email: 'test@test.com',
  name: 'Test Name',
  password: 'password'
};
const loginData = {
  email: 'test@test.com',
  password: 'password'
};
const userData = {
  email: 'test@test.com',
  name: 'Test Name'
};
const expectedResponse = {
  success: true,
  user: userData,
  accessToken: 'beuhrfbshnjdn',
  refreshToken: 'efgfhdjbjhs'
};
const initialState = {
  data: null,
  order: null,
  orders: [],
  orderModalData: null,
  orderRequest: false,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  error: null
};

describe('тесты редьюсеров', () => {
  let store = configureStore({
    reducer: {
      user: userSlice.reducer
    }
  });

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlice.reducer
      }
    });
  });

  test('authChecked должен устанавливать isAuthChecked в true', () => {
    store.dispatch(authChecked());
    expect(selectAuthChecked({ user: store.getState().user })).toBe(true);
  });

  test('resetOrderState должен сбрасывать состояние заказов', () => {
    store.dispatch(resetOrderState());
    expect(selectUserOrders({ user: store.getState().user })).toEqual([]);
    expect(selectOrderModalData({ user: store.getState().user })).toBeNull();
  });
});

describe('тесты асинхронных экшенов', () => {
  test('registerUserApi корректно отправляет данные для регистрации', async () => {
    const registerUserMock = jest
      .spyOn(api, 'registerUserApi')
      .mockResolvedValue(expectedResponse);
    await api.registerUserApi(registerData);
    expect(registerUserMock).toBeCalled();
    expect(api.registerUserApi).toHaveBeenCalledWith(registerData);
  });
});
