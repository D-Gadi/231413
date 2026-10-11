import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const index = state.findIndex((i) => i.id === product.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(product);
      }
    },
    removeFromWishlist(state, action) {
      return state.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
