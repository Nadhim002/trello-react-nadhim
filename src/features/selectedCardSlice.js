import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const selectedCardSlice = createSlice({
  name: "selectedCard",
  initialState,
  reducers: {
    setSelectedCard: (state, action) => {
      return action.payload
    },
  },
})

export const { setSelectedCard } = selectedCardSlice.actions
export default selectedCardSlice.reducer
