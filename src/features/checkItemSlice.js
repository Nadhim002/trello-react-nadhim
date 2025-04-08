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
    add: (state, action) => {
      const { idChecklist: checkListId } = action.payload
      state.checkItemsData[checkListId] = [
        ...(state.checkItemsData[checkListId] ?? []),
        action.payload,
      ]
    },
    delete: (state, action) => {
      const { checkListId, checkItemId } = action.payload
      state.checkItemsData[checkListId] = state.checkItemsData[
        checkListId
      ].filter((checkItem) => checkItem.id != checkItemId)
    },
    update: (state, action) => {
      const { idChecklist: checkListId, id: checkItemId } = action.payload
      state.checkItemsData[checkListId] = state.checkItemsData[checkListId].map(
        (checkItem) => {
          if ((checkItem.id = checkItemId)) {
            return action.payload
          }
          return checkItem
        }
      )
    },
  },
})

export const {
  setData,
  setError,
  add,
  delete: deleteCheckItem,
  update,
} = checkItemsSlice.actions
export default checkItemsSlice.reducer
