import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "../features/boardSlice.js"

const reducer = { board : boardReducer }

export default configureStore({
  reducer: reducer,
})
