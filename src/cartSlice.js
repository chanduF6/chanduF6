import { createSlice } from "@reduxjs/toolkit";

/* ================= LOAD CART FROM LOCAL STORAGE ================= */

const savedCart =
  JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({

  name: "cart",

  initialState: {

    items: savedCart,

  },

  reducers: {

    // ================= ADD TO CART =================

    addToCart: (state, action) => {

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      // ITEM EXISTS
      if (existingItem) {

        existingItem.quantity += 1;

      } else {

        // NEW ITEM
        state.items.push({

          ...action.payload,

          quantity: 1,

        });

      }

      // SAVE TO LOCAL STORAGE
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    // ================= REMOVE ITEM =================

    removeCart: (state, action) => {

      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    // ================= CLEAR CART =================

    clearCart: (state) => {

      state.items = [];

      localStorage.removeItem("cartItems");
    },

    // ================= INCREMENT =================

    incrementQty: (state, action) => {

      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {

        item.quantity += 1;
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    // ================= DECREMENT =================

    decrementQty: (state, action) => {

      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {

        if (item.quantity > 1) {

          item.quantity -= 1;

        } else {

          state.items = state.items.filter(
            (item) =>
              item.id !== action.payload
          );
        }
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

  },

});

export const {

  addToCart,
  removeCart,
  clearCart,
  incrementQty,
  decrementQty,

} = cartSlice.actions;

export default cartSlice.reducer;