import { ingredientsSlice } from './slices/ingredientsSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { feedsSlice } from './slices/feedsSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [feedsSlice.reducerPath]: feedsSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer
});
