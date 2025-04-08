import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: null,
  cardsData: {},
}

const cardsSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.cardsData = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    add: (state, action) => {
      const { idList: listId } = action.payload
      if (!state.cardsData[listId]) {
        state.cardsData[listId] = []
      }

      state.cardsData[listId].push(action.payload)
    },
    delete: (state, action) => {
      const { cardId, listId } = action.payload
      state.cardsData[listId] = state.cardsData[listId].filter(
        (card) => card.id !== cardId
      )
    },
    changeStatus: (state, action) => {
      const { idList: listId, id: cardId } = action.payload
      state.cardsData[listId] = state.cardsData[listId].map((card) => {
        if (card.id == cardId) {
          return action.payload
        }
        return card
      })
    },
  },
})

export const {
  delete: deleteCard,
  setData,
  setError,
  changeStatus,
  add,
} = cardsSlice.actions
export default cardsSlice.reducer
