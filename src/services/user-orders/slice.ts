import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrderThunk, getUserOrdersthunk } from './actions';

type TOrderState = {
  orders: Array<TOrder>;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: unknown;
};

const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orders = [];
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
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload;
      })
      .addCase(getUserOrdersthunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectUserOrders: (state) => state.orders
  }
});

export const { resetOrderState } = orderSlice.actions;
export const { selectOrderModalData, selectOrderRequest, selectUserOrders } =
  orderSlice.selectors;
