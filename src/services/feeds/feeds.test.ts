import { configureStore } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';
import { expect, test, describe, jest } from '@jest/globals';
import {
  feedsSlice,
  selectIsLoading,
  selectOrders,
  selectTotal,
  selectTotalToday
} from './slice';
import { getFeedsThunk } from './action';

jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

const expectedOrders = [
  {
    _id: 'item-1',
    status: 'done',
    name: 'Test Item 1',
    createdAt: '01-01-1990',
    updatedAt: '02-01-1990',
    number: 1,
    ingredients: ['test-id-1', 'test-id-2']
  },
  {
    _id: 'item-2',
    status: 'done',
    name: 'Test Item 2',
    createdAt: '01-01-1990',
    updatedAt: '02-01-1990',
    number: 2,
    ingredients: ['test-id-1', 'test-id-2']
  }
];

describe('тесты асинхронных экшенов', () => {
  const expectedFeeds = {
    success: true,
    orders: expectedOrders,
    total: 2,
    totalToday: 2
  };

  test('успешное получение данных', async () => {
    const store = configureStore({
      reducer: {
        feedsReducer: feedsSlice.reducer
      }
    });
    const getFeedsMock = jest
      .spyOn(api, 'getFeedsApi')
      .mockResolvedValue(expectedFeeds);

    await store.dispatch(getFeedsThunk());
    const state = store.getState().feedsReducer;

    expect(getFeedsMock).toHaveBeenCalled();
    expect(state.orders).toEqual(expectedFeeds.orders);
    expect(state.total).toEqual(expectedFeeds.total);
    expect(state.totalToday).toEqual(expectedFeeds.totalToday);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);

    getFeedsMock.mockRestore();
  });

  test('тест обработки ошибки при загрузке данных о заказах', async () => {
    const errorMessage = 'Ошибка загрузки';
    const getFeedsMock = jest
      .spyOn(api, 'getFeedsApi')
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    try {
      await api.getFeedsApi();
    } catch (error) {
      expect(getFeedsMock).toBeCalled();
      if (error instanceof Error) {
        expect(error.message).toBe(errorMessage);
      }
    }
  });
});

describe('тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      feedsReducer: feedsSlice.reducer
    }
  });

  test('selectIsLoading должен возвращать состояние загрузки', () => {
    expect(selectIsLoading({ feeds: store.getState().feedsReducer })).toEqual(
      false
    );
    store.dispatch({ type: 'feeds/getAll/pending' });
    expect(selectIsLoading({ feeds: store.getState().feedsReducer })).toEqual(
      true
    );
  });

  test('selectOrders должен возвращать заказы', () => {
    const orders = expectedOrders;
    store.dispatch({
      type: 'feeds/getAll/fulfilled',
      payload: { orders, total: 2, totalToday: 1 }
    });
    expect(selectOrders({ feeds: store.getState().feedsReducer })).toEqual(
      orders
    );
  });

  test('selectTotal должен возвращать общее количество', () => {
    const total = 5;
    store.dispatch({
      type: 'feeds/getAll/fulfilled',
      payload: { orders: [], total, totalToday: 1 }
    });
    expect(selectTotal({ feeds: store.getState().feedsReducer })).toEqual(
      total
    );
  });

  test('selectTotalToday должен возвращать количество за сегодня', () => {
    const totalToday = 3;
    store.dispatch({
      type: 'feeds/getAll/fulfilled',
      payload: { orders: [], total: 5, totalToday }
    });
    expect(selectTotalToday({ feeds: store.getState().feedsReducer })).toEqual(
      totalToday
    );
  });

  test('selectOrders должен возвращать пустой массив, если нет заказов', () => {
    expect(selectOrders({ feeds: store.getState().feedsReducer })).toEqual([]);
  });
});
