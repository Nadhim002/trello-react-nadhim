import React from "react"
import { Stack, IconButton, Typography } from "@mui/material"
import ArchiveIcon from "@mui/icons-material/Archive"
import axios from "axios"
import HoverCard from "./HoverCard"
import AddTemplate from "./addHelper/AddTemplate"
import { toast } from "react-toastify"
import { useBoardPageContext } from "../pages/BoardPage"

export default function ListContainer({ listData }) {
  const { listDispatch, cardDispatch, cardsData } = useBoardPageContext()
  const { id: listId, name: listName } = listData
  const cardsDataOfGivenList = cardsData[listId]

  async function addCardHandler(cardName) {
    try {
      const id = toast.loading("Card Creation Started ... ")

      const cardDataResponse = await axios.post(
        "https://api.trello.com/1/cards",
        {},
        {
          params: {
            idList: listData.id,
            name: cardName,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      const cardDataObj = cardDataResponse.data

      toast.update(id, {
        render: `Sucessfully added ${cardDataObj.name} card`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      cardDispatch({
        type: "add",
        cardDataObj: cardDataObj,
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

  async function archiveListHandler(listId) {
    try {
      const res = await axios.put(
        `https://api.trello.com/1/lists/${listId}/closed`,
        {},
        {
          params: {
            value: true,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      const { id: archivedListId, name: listName } = res.data

      toast.success(`${listName} list has been archived`)

      listDispatch({
        type: "archive",
        archivedListId: archivedListId,
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <Stack
      direction="column"
      sx={{
        backgroundColor: "lightseagreen",
        padding: 2,
        borderRadius: "16px",
        boxShadow: 3,
        color: "white",
        gap: 1,
      }}
    >
      {listData && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" fontWeight={700} fontSize={16}>
            {listName}
          </Typography>
          <IconButton
            color="default"
            onClick={() => archiveListHandler(listId)}
          >
            <ArchiveIcon />
          </IconButton>
        </Stack>
      )}
      {cardsDataOfGivenList &&
        cardsDataOfGivenList.map((cardData) => (
          <HoverCard cardData={cardData} key={cardData.id} />
        ))}
      <AddTemplate width={250} addName={"Card"} addHandler={addCardHandler} />
    </Stack>
  )
}
