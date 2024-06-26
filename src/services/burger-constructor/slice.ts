import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type TConstructorState = {
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
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = {
            ...action.payload
          };
        } else {
          const ingredient = {
            ...action.payload
          };
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const currentItem = state.ingredients[action.payload];
      const targetItem = state.ingredients[action.payload + 1];
      state.ingredients[action.payload] = targetItem;
      state.ingredients[action.payload + 1] = currentItem;
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const currentItem = state.ingredients[action.payload];
      const targetItem = state.ingredients[action.payload - 1];
      state.ingredients[action.payload] = targetItem;
      state.ingredients[action.payload - 1] = currentItem;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorItems: (state) => state
  }
});

export const { addItem, removeItem, clearConstructor, moveDown, moveUp } =
  burgerConstructorSlice.actions;
export const { selectConstructorItems } = burgerConstructorSlice.selectors;
