import * as api from '../../utils/burger-api';
import { expect, test, describe, jest } from '@jest/globals';

describe('тесты асинхронных экшенов', () => {
  test('тест получения данных о заказах', async () => {
    const getFeedsMock = jest.spyOn(api, 'getFeedsApi').mockImplementation(() => Promise.resolve({
        success: true,
        orders: [],
        total: 0,
        totalToday: 0
    }));
    const feeds = await api.getFeedsApi();
    expect(getFeedsMock).toBeCalled();
    expect(feeds).toEqual({
        success: true,
        orders: [],
        total: 0,
        totalToday: 0
    });
    getFeedsMock.mockRestore();
  });

  test('тест обработки ошибки при загрузке данных о заказах', async () => {
    const errorMessage = 'Ошибка загрузки';
    const getFeedsMock = jest.spyOn(api, 'getFeedsApi').mockImplementationOnce(() => 
      Promise.reject(new Error(errorMessage))
    );
    
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
