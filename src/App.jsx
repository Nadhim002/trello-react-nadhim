import React from "react"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Mainlayout from "./layouts/Mainlayout"
import BoardPage from "./components/BoardPage"
import Homepage from "./components/Homepage"

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
