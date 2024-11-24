import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdvancedSettingsState {
  scan_type: string;
  version_detection: string | null;
  version_intensity_value: number | null;
  host_discovery: string | null;
  timing: string | null;
  min_rate: number | null;
  max_rate: number | null;
}

const defaultState: AdvancedSettingsState = {
  scan_type: "-sS",
  version_detection: "-sV",
  version_intensity_value: null,
  host_discovery: null,
  timing: "-T3",
  min_rate: null,
  max_rate: null,
};

const initialState: AdvancedSettingsState = { ...defaultState };

export const advancedSettingsSlice = createSlice({
  name: "advancedSettingsSlice",
  initialState,
  reducers: {
    setAdvancedSettings: (
      state,
      action: PayloadAction<AdvancedSettingsState>,
    ) => {
      state = action.payload;
    },
  },
});

export const { setAdvancedSettings } = advancedSettingsSlice.actions;

export default advancedSettingsSlice.reducer;
