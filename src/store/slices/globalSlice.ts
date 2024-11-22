import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface globalState {
	inputValue: string
}

const defaultState: globalState = {
	inputValue: '',
}

const initialState: globalState = { ...defaultState }

export const globalSlice = createSlice({
	name: 'globalSlice',
	initialState,
	reducers: {
		setInputValue: (state, action: PayloadAction<string>) => {
			state.inputValue = action.payload
		},
	},
})

export const { setInputValue } = globalSlice.actions

export default globalSlice.reducer
