import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);
