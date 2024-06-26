import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";

export const store = configureStore({
  reducer: {
    // cambiar items por otra cosa mas entendible
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
