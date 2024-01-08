import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CartState {
  totalAmount?: number;
  quantityCart?: number;
}

// Define the initial state using that type
const initialState: CartState = {
  totalAmount: undefined,
  quantityCart: undefined,
};

const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCart: (_, action: PayloadAction<CartState>) => ({
      quantityCart: action.payload.quantityCart,
      totalAmount: action.payload.totalAmount,
    }),
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
