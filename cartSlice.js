import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter(
        (i) =>
          !(
            i.id === action.payload.id &&
            i.size === action.payload.size &&
            i.color === action.payload.color
          )
      );
    },
    increaseQuantity(state, action) {
      const { id, size, color } = action.payload;
      const item = state.find(
        (i) => i.id === id && i.size === size && i.color === color
      );
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action) {
      const { id, size, color } = action.payload;
      const item = state.find(
        (i) => i.id === id && i.size === size && i.color === color
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
