import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",

  initialState: {
    items: [],
  },

  reducers: {
    addOrder: (state, action) => {
      state.items.push(action.payload);
    },

    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;