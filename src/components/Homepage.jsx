import React, { useEffect, useState } from "react"
import BoardCard from "./BoardCard"
import axios from "axios"
import { Typography, Grid } from "@mui/material"
import CreateBoardModal from "./CreateBoardModal"
import { toast } from "react-toastify"

export default function Homepage() {
  const [boardsData, setBoardsData] = useState(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getAllBoards() {
      try {
        const res = await axios.get(
          "https://api.trello.com/1/members/me/boards",
          {
            params: {
              key: import.meta.env.VITE_API_KEY,
              token: import.meta.env.VITE_TOKEN,
            },
          }
        )
        setBoardsData(res.data)
      } catch (err) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getAllBoards()
  }, [])

  async function addNewBoard(newBoardName) {
    const res = await axios.post(
      "https://api.trello.com/1/boards/",
      {},
      {
        params: {
          name: newBoardName,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_TOKEN,
        },
      }
    )
    return res.data
  }

  async function addNewBoardHandler(newBoardName) {
    const id = toast.loading("Board Creation Started ... ")

    try {
      const newBoardObj = await addNewBoard(newBoardName)

      toast.update(id, {
        render: `${newBoardObj.name} Board created Sucessfully`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      })

      setBoardsData([...boardsData, newBoardObj])
    } catch (err) {
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      })
    }
  }

  function createBoard() {
    return (
      <Grid
        container
        sx={{
          width: "200px",
          height: "120px",
          backgroundColor: "#D3D3D3",
          borderRadius: "20px",
          "&:hover": {
            opacity: 0.9,
            cursor: "pointer",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Typography
          variant="h6"
          sx={{ padding: 2, color: "white", fontWeight: 900 }}
        >
          {"Create Board "}
        </Typography>
      </Grid>
    )
  }

  return (
    <>
      {isLoading ? (
        <Grid>Loading...</Grid>
      ) : error ? (
        <Grid>SomeThing went wrong...</Grid>
      ) : (
        <Grid
          container
          direction="row"
          spacing={4}
          padding={6}
          sx={{ spacing: 4, padding: 6 }}
        >
          {boardsData &&
            boardsData.map((boardData) => {
              return <BoardCard boardData={boardData} key={boardData.id} />
            })}
          {boardsData && createBoard()}
        </Grid>
      )}

      <CreateBoardModal
        open={open}
        addNewBoardHandler={addNewBoardHandler}
        setOpen={setOpen}
      />
    </>
  )
}
