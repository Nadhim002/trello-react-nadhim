import React from "react"
import { Stack, IconButton, Typography } from "@mui/material"
import ArchiveIcon from "@mui/icons-material/Archive"
import HoverCard from "./HoverCard"
import AddTemplate from "./addHelper/AddTemplate"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { archive as archiveListAction, setError as setListError } from "../features/listSlice"
import { setError as setCardError, add as addCardAction } from "../features/cardSlice.js"
import { addNewCard } from "../backend/cardCalls.js"
import { archiveList } from "../backend/listCalls.js"


export default function ListContainer({ listData }) {

  const cardsData = useSelector(state => state.card.cardsData)
  const dispatch = useDispatch()

  const { id: listId, name: listName } = listData
  const cardsDataOfGivenList = cardsData[listId]

  async function addCardHandler(cardName) {
    try {
      const id = toast.loading("Card Creation Started ... ")

      const cardDataResponse = await addNewCard(listId, cardName)
      const cardData = cardDataResponse.data

      toast.update(id, {
        render: `Sucessfully added ${cardData.name} card`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      dispatch(addCardAction(cardData))

    } catch (err) {

      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 500,
      })

      dispatch(setCardError(err))


    }
  }

  async function archiveListHandler(listId) {
    try {
      const archivedListResponse = await archiveList(listId)
      const archivedList = archivedListResponse.data
      const { id: archivedListId, name: listName } = archivedList
      toast.success(`${listName} list has been archived`)
      dispatch(archiveListAction(archivedListId))
    } catch (err) {
      toast.error(err.message)
      dispatch(setListError(err))
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
