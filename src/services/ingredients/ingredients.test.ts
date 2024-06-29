import { configureStore } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';
import { expect, test, describe, jest } from '@jest/globals';
import { getIngredientsThunk } from './action';
import { ingredientsSlice, selectIngredients, selectIsLoading } from './slice';
import { error } from 'console';

jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

const expectedIngredients = [
  {
    _id: 'item-1',
    name: 'Test Item 1',
    type: 'sauce',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 60,
    price: 180,
    image: 'test-image.jpg',
    image_large: 'test-image-large.jpg',
    image_mobile: 'test-image-mobile.jpg'
  },
  {
    _id: 'item-2',
    name: 'Test Item 2',
    type: 'bun',
    proteins: 20,
    fat: 10,
    carbohydrates: 20,
    calories: 50,
    price: 180,
    image: 'test-image.jpg',
    image_large: 'test-image-large.jpg',
    image_mobile: 'test-image-mobile.jpg'
  }
];

describe('тесты асинхронных экшенов', () => {
  const initialState = {
    isLoading: false,
    error: null,
    ingredients: expectedIngredients
  };

  test('успешное получение данных', async () => {
    const getIngredientsMock = jest
      .spyOn(api, 'getIngredientsApi')
      .mockResolvedValue(expectedIngredients);
    const store = configureStore({
      reducer: ingredientsSlice.reducer
    });
    await store.dispatch(getIngredientsThunk());
    const state = store.getState();
    expect(getIngredientsMock).toHaveBeenCalled();
    expect(state.ingredients).toEqual(initialState.ingredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    getIngredientsMock.mockRestore();
  });

  test('тест обработки ошибки при загрузке ингредиентов', async () => {
    const errorMessage = 'Ошибка загрузки';
    const getIngredientsMock = jest
      .spyOn(api, 'getIngredientsApi')
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    try {
      await api.getIngredientsApi();
    } catch (error) {
      expect(getIngredientsMock).toBeCalled();
      if (error instanceof Error) {
        expect(error.message).toBe(errorMessage);
      }
    }
  });
});

describe('тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsSlice.reducer
    }
  });

  test('selectIsLoading должен возвращать состояние загрузки', () => {
    expect(
      selectIsLoading({ ingredients: store.getState().ingredients })
    ).toEqual(false);
    store.dispatch({ type: 'ingredients/getAll/pending' });
    expect(
      selectIsLoading({ ingredients: store.getState().ingredients })
    ).toEqual(true);
  });

  test('selectIngredients должен возвращать ингредиенты', () => {
    const ingredients = expectedIngredients;
    store.dispatch({
      type: 'ingredients/getAll/fulfilled',
      payload: ingredients
    });
    expect(
      selectIngredients({ ingredients: store.getState().ingredients })
    ).toEqual(ingredients);
  });
});
