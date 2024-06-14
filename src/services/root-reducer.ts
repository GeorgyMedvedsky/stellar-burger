import { ingredientsSlice } from './slices/ingredients';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { feedsSlice } from './slices/feeds';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';

export const rootReducer = combineReducers({
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [feedsSlice.reducerPath]: feedsSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer
});
