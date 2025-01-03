import { configureStore } from "@reduxjs/toolkit";
import  storeSlice  from "../redux-toolkit/StoreProvider";

export const store = configureStore({
  reducer:{
    toggleFun: storeSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch