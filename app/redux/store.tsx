import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slice/boardSlice";

export const store = configureStore({
  reducer: {
    boardSlice: boardReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Inferred type: {posts: PostsState, comment: CommentsState, users: UsersState }
export type AppDispatch = AppStore["dispatch"];
