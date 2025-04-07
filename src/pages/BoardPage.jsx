import React, {
  useEffect,
  useRef,
  useState,
} from "react"

import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Stack, Box, Typography, Alert } from "@mui/material"
import ListContainer from "../components/ListContainer.jsx"
import AddTemplate from "../components/addHelper/AddTemplate.jsx"
import CardModal from "../components/CardModal.jsx"
import Spinner from "../components/spinner/Spinner.jsx"
import { setData as setCardData } from "../features/cardSlice.js"
import { setData as setListData, add as addList, setError as setListError } from "../features/listSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { getBoardInfo } from "../backend/loaders.js"
import { addNewList } from "../backend/listCalls.js"

export default function BoardPage() {

  const { boardId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const { listsData } = useSelector(state => state.list)

  const boardInfo = useRef(null)

  const [selectedCardInfo, setSelectedCardInfo] = useState(null)

  useEffect(() => {

    async function setData() {
      try {
        const [boardDataResponse, listsDataResponse, cardsDataReponse] =
          await getBoardInfo(boardId)

        const cardsData = cardsDataReponse.data.reduce((acc, cardData) => {
          const listIdOfCard = cardData["idList"]

          if (!acc[listIdOfCard]) {
            acc[listIdOfCard] = []
          }

          acc[listIdOfCard].push(cardData)

          return acc
        }, {})
        boardInfo.current = boardDataResponse.data

        dispatch(setCardData(cardsData))
        dispatch(setListData(listsDataResponse.data))

      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    setData()
  }, [])


  async function addListHandler(newListName) {

    const boardId = boardInfo.current.id
    const id = toast.loading("List Creation Started ... ")

    try {

      const newListResponse = await addNewList(newListName, boardId)
      const newList = newListResponse.data

      toast.update(id, {
        render: `Sucessfully added ${newList.name}`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      dispatch(addList(newList))

    } catch (err) {
      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 500,
      })
      dispatch(setListError(err))
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert severity="error">
          Something went wrong. Please try again later.
        </Alert>
      ) : (
        <>

          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 0.5,
              px: 1,
              margin: 0,
              borderBottom: "1px solid #ddd",
              fontWeight: "500",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {boardInfo.current.name}
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="flex-start"
            spacing="10px"
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              padding: 2,
              spacing: 4,
              height: "90vh",
              backgroundImage: `url(${boardInfo.current["prefs"]["backgroundImage"]})`,
              backgroundColor: boardInfo.current.prefs.backgroundColor,
            }}
          >
            {listsData.map((list) => (
              <ListContainer listData={list} key={list["id"]} />
            ))}

            <Box sx={{ flex: "0 0 auto" }}>
              <AddTemplate
                width={250}
                addName={"List"}
                addHandler={addListHandler}
              />
            </Box>
          </Stack>

          {selectedCardInfo && (
            <CardModal
              selectedCardInfo={selectedCardInfo}
              setSelectedCardInfo={setSelectedCardInfo}
            />
          )}

        </>
      )}
    </>
  )
}
