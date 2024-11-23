import { configureStore } from "@reduxjs/toolkit";

import { globalSlice, scanSlice } from "./slices";

export const store = configureStore({
  reducer: {
    globalSlice,
    scanSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
