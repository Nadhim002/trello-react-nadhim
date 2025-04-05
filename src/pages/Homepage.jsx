import React, { useEffect, useReducer } from "react"
import { Typography, Grid, Alert } from "@mui/material"
import { Helmet } from "react-helmet"

import { toast } from "react-toastify"
import Spinner from "../components/spinner/Spinner.jsx"

import AddUsingModal from "../components/addHelper/AddUsingModal.jsx"
import BoardCard from "../components/BoardCard.jsx"

import axios from "axios"
import { boardReducer } from "../reducers/reducers.js"

export default function Homepage() {
  const [boardsState, boardsDispatcher] = useReducer(boardReducer, {
    error: false,
    loading: false,
    boardsData: [],
  })
  const boardsData = boardsState?.boardsData

  useEffect(() => {

    async function getAllBoards() {
      try {
        const boardsDataResponse = await axios.get(
          "https://api.trello.com/1/members/me/boards",
          {
            params: {
              key: import.meta.env.VITE_API_KEY,
              token: import.meta.env.VITE_TOKEN,
            },
          }
        )
        boardsDispatcher({
          type: "set_data",
          boardsData: boardsDataResponse.data,
        })
      } catch (err) {
        boardsDispatcher({
          type: "error",
        })
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
      const newBoard = await addNewBoard(newBoardName)
      toast.update(id, {
        render: `${newBoard.name} Board created Sucessfully`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      boardsDispatcher({
        type: "add",
        newBoard: newBoard,
      })
    } catch (err) {
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 500,
      })
    }
  }

  function createBoard() {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          height: "120px",
          backgroundColor: "#D3D3D3",
          borderRadius: "20px",
          "&:hover": {
            opacity: 0.9,
            cursor: "pointer",
          },
        }}
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
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="This is the home page of my website"
        />
      </Helmet>
      {boardsState.loading ? (
        <Grid>
          <Spinner />
        </Grid>
      ) : boardsState.error ? (
        <Alert severity="error">
          Something went wrong. Please try again later.
        </Alert>
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

          <AddUsingModal addHandler={addNewBoardHandler} toAddName={"Board"}>
            {createBoard()}
          </AddUsingModal>
        </Grid>
      )}
    </>
  )
}
