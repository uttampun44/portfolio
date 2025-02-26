import { configureStore } from "@reduxjs/toolkit";
import  AuthSlice  from "../lib/features/auth/Auth";

export const store = configureStore({
  reducer:{
    auth: AuthSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch