import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = {
          ...action.payload,
          price: action.payload.price
        };
      } else {
        state.ingredients.push(action.payload);
      }
    }
    // removeItem: (state, action: PayloadAction<string>) => {
    //   state.ingredients = state.ingredients.filter(
    //     (i) => i._id !== action.payload
    //   );
    // }
  },
  selectors: {
    selectConstructorItems: (state) => state
  }
});

export const { addItem } = constructorSlice.actions;
export const { selectConstructorItems } = constructorSlice.selectors;
export const reducer = constructorSlice.reducer;
