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

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: { addToCart, removeFromCart },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-async-980fd-default-rtdb.firebaseio.com/cart",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
