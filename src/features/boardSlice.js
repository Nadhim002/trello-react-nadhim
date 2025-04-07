import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: false,
  loading: true,
  boardsData: [],
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.loading = false
      state.error = false
      state.boardsData = action.payload
    },
    setError: (state, action) => {
      state.loading = false
      state.error = true
    },
    add: (state, action) => {
      state.boardsData.push(action.payload)
    },
  },
})

export const { setData, setError, add } = boardSlice.actions
export default boardSlice.reducer
