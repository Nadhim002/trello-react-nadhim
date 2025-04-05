import React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar/NavBar"
import { ToastContainer } from "react-toastify"

export default function Mainlayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </>
  )
}
