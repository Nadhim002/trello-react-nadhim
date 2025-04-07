import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: null,
  listsData: [],
}

const listsSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.listsData = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    add: (state, action) => {
      state.listsData.push(action.payload)
    },
    archive: (state, action) => {
      state.listsData = state.listsData.filter(
        (list) => list.id != action.payload
      )
    },
  },
})

export const { setData, setError, add, archive } = listsSlice.actions
export default listsSlice.reducer
