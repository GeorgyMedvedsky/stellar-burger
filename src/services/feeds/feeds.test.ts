import { configureStore } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';
import { expect, test, describe, jest } from '@jest/globals';
import { feedsSlice } from './slice';
import { getFeedsThunk } from './action';

jest.mock('../../utils/burger-api');

describe('тесты асинхронных экшенов', () => {
  const expectedFeeds = {
    success: true,
    orders: [
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
    ],
    total: 2,
    totalToday: 2
  };

  test('получение данных о заказах', async () => {
    const getFeedsMock = jest.spyOn(api, 'getFeedsApi').mockResolvedValue(expectedFeeds);
    const store = configureStore({
      reducer: {
        feedsReducer: feedsSlice.reducer
      }
    });
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
