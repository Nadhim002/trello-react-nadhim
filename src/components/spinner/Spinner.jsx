import React from "react"
import ClipLoader from "react-spinners/ClipLoader"

const override = {
  display: "block",
  margin: "100px auto",
}

export default function Spinner() {
  return (
    <ClipLoader
      color="#4338ca"
      cssOverride={override}
      size={150}
    />
  )
}
