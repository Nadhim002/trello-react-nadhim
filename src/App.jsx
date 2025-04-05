import React from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Mainlayout from "./layouts/Mainlayout"
import BoardPage from "./pages/BoardPage"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<Homepage />} />
      <Route path="/:boardId" element={<BoardPage />} />
      <Route path="*" element = {<PageNotFound />} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={route} />
}
