import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: null,
  checkItemsData: {},
}

const checkItemsSlice = createSlice({
  name: "checkItem",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.checkItemsData = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setData, setError } = checkItemsSlice.actions
export default checkItemsSlice.reducer
