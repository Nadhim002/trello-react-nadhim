import React from "react"
import { Stack, Card, IconButton, Typography } from "@mui/material"
import ArchiveIcon from "@mui/icons-material/Archive"
import axios from "axios"
import HoverCard from "./HoverCard"
import AddTemplate from "./AddTemplate"

export default function ListContainer({
  listData,
  cardsData,
  cardDispatch,
  listDispatch,
  setSelectedCardInfo,
}) {
  async function addCardHandler(cardName) {
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

    cardDispatch({
      type: "add",
      cardDataObj: cardDataObj,
    })
  }

  async function archiveListHandler() {
    console.log("Running")

    const res = await axios.put(
      `https://api.trello.com/1/lists/${listData.id}/closed`,
      {},
      {
        params: {
          value: true,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_TOKEN,
        },
      }
    )

    const archivedListId = res.data.id

    listDispatch({
      type: "archive",
      archivedListId: archivedListId,
    })
  }

  return (
    <Stack
      direction="column"
      sx={{
        backgroundColor: "blue",
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
            {listData["name"]}
          </Typography>
          <IconButton color="default" onClick={archiveListHandler}>
            <ArchiveIcon />
          </IconButton>
        </Stack>
      )}
      {cardsData &&
        cardsData.map((cardData) => (
          <HoverCard
            cardData={cardData}
            key={cardData.id}
            setSelectedCardInfo={setSelectedCardInfo}
            listId = { listData.id } 
            cardDispatch = {cardDispatch}
          />
        ))}
      <AddTemplate  width = {250} addName = {"Card"} addHandler = {addCardHandler} />
    </Stack>
  )
}
