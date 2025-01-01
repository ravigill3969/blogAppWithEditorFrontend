import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: { categoryReducer, userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
