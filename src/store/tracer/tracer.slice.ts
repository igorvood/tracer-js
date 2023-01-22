import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const LS_ID_GROUP = 'LS_ID_GROUP'

interface TracerState {
  idGroup: string
}

const initialState: TracerState = {
  idGroup: JSON.parse(localStorage.getItem(LS_ID_GROUP) ?? '{}')
}

export const tracerSlice = createSlice({
  name: 'tracerState',
  initialState,
  reducers: {
    rememberIdGroup(state, action: PayloadAction<string>) {
      state.idGroup = action.payload
      localStorage.setItem(LS_ID_GROUP, JSON.stringify(state.idGroup))
    },

  }
})

export const tracerActions = tracerSlice.actions
export const tracerReducer = tracerSlice.reducer