import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ScanData } from "./scanSlice";

export interface globalState {
  lastScans: ScanData[];
}

const defaultState: globalState = {
  lastScans: [],
};

const initialState: globalState = { ...defaultState };

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setLastScans: (state, action: PayloadAction<ScanData[]>) => {
      state.lastScans = action.payload;
    },
  },
});

export const { setLastScans } = globalSlice.actions;

export default globalSlice.reducer;
