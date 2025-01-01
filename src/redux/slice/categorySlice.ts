import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  value: string | null;
}

const initialState: CategoryState = {
  value: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onAddCategory: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload;
    },
  },
});

export const { onAddCategory } = categorySlice.actions;
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
