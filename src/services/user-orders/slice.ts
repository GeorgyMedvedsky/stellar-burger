import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrderThunk } from './actions';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: unknown;
};

const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orderRequest = false;
      state.orderModalData = null;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.order = action.payload.order;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload;
      });
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrder: (state) => state.order
  }
});

export const { selectOrderModalData, selectOrderRequest, selectOrder } =
  orderSlice.selectors;
