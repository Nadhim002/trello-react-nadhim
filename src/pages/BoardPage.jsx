import React, {
  useReducer,
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
} from "react"

import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { Stack, Box, Typography, Alert } from "@mui/material"
import { Helmet } from "react-helmet"
import ListContainer from "../components/ListContainer.jsx"
import AddTemplate from "../components/addHelper/AddTemplate.jsx"
import CardModal from "../components/CardModal.jsx"
import Spinner from "../components/spinner/Spinner.jsx"
import { cardReducer, listReducer } from "../reducers/reducers.js"
import { getBoardInfo } from "../backend/loaders.js"

const boardPageContext = createContext()

export function useBoardPageContext() {
  return useContext(boardPageContext)
}

export default function BoardPage() {
  const { boardId } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [listData, listDispatch] = useReducer(listReducer, [])
  const [cardsData, cardDispatch] = useReducer(cardReducer, {})
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
        listDispatch({ type: "set_data", data: listsDataResponse.data })
        cardDispatch({ type: "set_data", data: cardsData })
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
      const res = await axios.post(
        "https://api.trello.com/1/lists",
        {},
        {
          params: {
            name: newListName,
            idBoard: boardId,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      const newListObject = res.data

      toast.update(id, {
        render: `Sucessfully added ${newListObject.name}`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      listDispatch({
        type: "add",
        newList: newListObject,
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

  return (
    <>
      <Helmet>
        <title>{"Board Page"}</title>
        <meta
          name="description"
          content="This is the home page of my website"
        />
      </Helmet>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert severity="error">
          Something went wrong. Please try again later.
        </Alert>
      ) : (
        <boardPageContext.Provider
          value={{
            listData,
            listDispatch,
            cardsData,
            cardDispatch,
            selectedCardInfo,
            setSelectedCardInfo,
          }}
        >
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
            {listData.map((list) => (
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
        </boardPageContext.Provider>
      )}
    </>
  )
}
