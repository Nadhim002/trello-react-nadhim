import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: null,
  checkListsData : [] ,
}

const checkListsSlice = createSlice({
  name: "checkItem",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.checkListsData = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setData, setError } = checkListsSlice.actions
export default checkListsSlice.reducer
