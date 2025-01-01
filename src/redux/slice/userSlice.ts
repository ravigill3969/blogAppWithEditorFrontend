import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
}

const initialState: UserState = {
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { addUserId } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
