import React, { useEffect} from "react"
import { Typography, Grid, Alert } from "@mui/material"
import { toast } from "react-toastify"
import Spinner from "../components/spinner/Spinner.jsx"
import AddUsingModal from "../components/addHelper/AddUsingModal.jsx"
import BoardCard from "../components/BoardCard.jsx"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { add as addBoardAction, setData as setBoardData, setError } from "../features/boardSlice.js"
import { addNewBoard } from "../backend/boardCalls.js"

export default function Homepage() {

  const { error, loading, boardsData } = useSelector(state => state.board)
  const dispatch = useDispatch()

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

        dispatch(setBoardData(boardsDataResponse.data))

      } catch (err) {

        dispatch(setError())

      }
    }

    getAllBoards()
  }, [])

  async function addNewBoardHandler(newBoardName) {

    const id = toast.loading("Board Creation Started ... ")

    try {

      const newBoardReponse = await addNewBoard(newBoardName)
      const newBoard = newBoardReponse.data

      toast.update(id, {
        render: `${newBoard.name} Board created Sucessfully`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      dispatch(addBoardAction(newBoard))

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
      {loading ? (
        <Grid>
          <Spinner />
        </Grid>
      ) : error ? (
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
