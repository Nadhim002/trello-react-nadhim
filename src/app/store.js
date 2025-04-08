import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "../features/boardSlice.js"
import listReducer from "../features/listSlice.js"
import cardReducer from "../features/cardSlice.js"
import checkListReducer from "../features/checkListSlice.js"
import checkItemReducer from "../features/checkItemSlice.js"
import selectedCardSlice from "../features/selectedCardSlice.js"

const reducer = {
  board: boardReducer,
  list: listReducer,
  card: cardReducer,
  checkList: checkListReducer,
  checkItem: checkItemReducer,
  selectedCard: selectedCardSlice,
}

export default configureStore({
  reducer: reducer,
})
