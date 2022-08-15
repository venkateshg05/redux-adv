import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
};

const addToCart = (state, action) => {
  state.totalQuantity++;
  const newItem = action.payload["newItem"];
  const exisistingItem = state.items.find((item) => item.id === newItem.id);
  if (exisistingItem) {
    exisistingItem.quantity++;
    exisistingItem.totalPrice = exisistingItem.totalPrice + newItem.price;
  } else {
    state.items.push({
      id: newItem.id,
      title: newItem.title,
      price: newItem.price,
      quantity: 1,
      totalPrice: newItem.price,
      name: newItem.title,
    });
  }
};

const removeFromCart = (state, action) => {
  state.totalQuantity--;
  const id = action.payload["id"];
  const exisistingItem = state.items.find((item) => item.id === id);
  if (exisistingItem.quantity === 1) {
    state.items = state.items.filter((item) => item.id !== id);
  } else {
    exisistingItem.quantity--;
    exisistingItem.totalPrice =
      exisistingItem.totalPrice - exisistingItem.price;
  }
};

const replaceCart = (state, action) => {
  state.totalQuantity = action.payload.cartData.totalQuantity;
  state.items = action.payload.cartData.items;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: { replaceCart, addToCart, removeFromCart },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
