import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  userName?: string;
  token?: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  userName: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<AuthState>) => ({
      userName: action.payload.userName,
      token: action.payload.token,
    }),
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
