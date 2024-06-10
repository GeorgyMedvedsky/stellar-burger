import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

type TFeedsData = TOrdersData & {
  isLoading: boolean;
  error: null | string | undefined;
};

const initialState: TFeedsData = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  }
});

export const reducer = feedsSlice.reducer;
export const { selectIsLoading, selectOrders, selectTotal, selectTotalToday } =
  feedsSlice.selectors;
