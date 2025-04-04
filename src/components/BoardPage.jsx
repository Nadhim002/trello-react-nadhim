import React, { useReducer, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

import { Stack, Box, Card, Modal, Typography } from "@mui/material"
import ListContainer from "./ListContainer"
import AddTemplate from "./AddTemplate"
import CardModal from "./CardModal"
import { cardReducer, listReducer } from "../reducers/reducers.js"
import { getBoardInfo } from "../backend/loaders.js"

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

    console.log(boardId, newListName)

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
        autoClose: 1000,
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
        autoClose: 1000,
      })
    }
  }

  return loading ? (
    <Card>Loading ...</Card>
  ) : error ? (
    <Card>SomeThing Went Wrong ...</Card>
  ) : (
    <>
      <Typography>{boardInfo.current.name}</Typography>

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
        }}
      >
        {listData.map((list) => (
          <ListContainer
            listData={list}
            cardsData={cardsData[list["id"]]}
            key={list["id"]}
            cardDispatch={cardDispatch}
            listDispatch={listDispatch}
            setSelectedCardInfo={setSelectedCardInfo}
          />
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
  )
}
