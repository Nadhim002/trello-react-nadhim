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

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<Homepage />} />
      <Route path="/:boardId" element={<BoardPage />} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={route} />
}
