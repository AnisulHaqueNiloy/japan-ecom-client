import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

import adminReducer from "../admin_pages/overview/slice/adminSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import languageReducer from "../redux/languageSlice";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    admin: adminReducer,
    cart: cartReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
