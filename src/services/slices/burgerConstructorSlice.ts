import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = {
          ...action.payload
        };
      } else {
        const ingredient = {
          ...action.payload,
          id: uuid()
        };
        state.ingredients.push(ingredient);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    }
  },
  selectors: {
    selectConstructorItems: (state) => state
  }
});

export const { addItem, removeItem } = burgerConstructorSlice.actions;
export const { selectConstructorItems } = burgerConstructorSlice.selectors;
