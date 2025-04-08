import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: null,
  checkListsData: [],
}

const checkListsSlice = createSlice({
  name: "checkList",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.checkListsData = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    add: (state, action) => {
      state.checkListsData = [...(state.checkListsData || []), action.payload]
    },
    delete: (state, action) => {
      state.checkListsData = state.checkListsData.filter(
        (checkList) => checkList.id != action.payload
      )
    },
  },
})

export const {
  setData,
  setError,
  add,
  delete: deleteCheckList,
} = checkListsSlice.actions
export default checkListsSlice.reducer
