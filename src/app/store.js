import { configureStore } from "@reduxjs/toolkit"
import { boardReducer } from "../features/boardSlice.js"

reducer = { boardReducer }

export default configureStore({
  reducer: reducer,
})
