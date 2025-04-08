import React, { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  ButtonGroup,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { toast } from "react-toastify"
import { cardUpdate, cardDelete } from "../backend/cardCalls.js"
import { changeStatus, deleteCard as deleteCardAction, setError as setCardError } from "../features/cardSlice.js"
import { setSelectedCard } from "../features/selectedCardSlice.js"
import { useDispatch } from "react-redux"

function HoverCard({ cardData }) {

  const [hover, setHover] = useState(false)
  const { id: cardId, idList: listId, name: cardName } = cardData
  const isChecked = cardData.dueComplete

  const dispatch = useDispatch()

  async function cardUpdateHandler(
    cardId,
    toChangeCardAtrribute,
    toChangeBoolean
  ) {
    try {
      const responseCard = await cardUpdate(cardId, toChangeCardAtrribute, toChangeBoolean)
      const updatedCard = responseCard.data

      dispatch(changeStatus(updatedCard))

      toast.success(`${updatedCard.name} card has been updated scucessfully`)
    } catch (err) {
      dispatch(setCardError(err))
      toast.error("Something went wrong")
    }
  }

  async function cardDeleteHandler(cardId, listId) {
    try {
      const response = await cardDelete(cardId)

      if (response.status == 200) {
        dispatch(deleteCardAction({ cardId, listId }))

        toast.success(`Card has been Deleted scucessfully`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err) {
      dispatch(setCardError(err))
      toast.error(err.message)
    }
  }

  return (
    <Card
      sx={{
        cursor: "pointer",
        p: 0,
        backgroundColor: "yellow",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          py: 0,
          "&:last-child": { paddingBottom: 0 },
        }}
      >
        <Card
          onClick={() =>
            dispatch(setSelectedCard(cardData))
          }
          sx={{
            flexGrow: 1,
            padding: 1,
            backgroundColor: "yellow",
            boxShadow: "none",
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            {cardName}
          </Typography>
        </Card>

        <ButtonGroup>
          <IconButton
            sx={{
              visibility: hover ? "visible" : "hidden",
            }}
            onClick={() => cardDeleteHandler(cardId, listId)}
          >
            <DeleteIcon />
          </IconButton>
          <Checkbox
            sx={{
              visibility: isChecked || hover ? "visible" : "hidden",
            }}
            checked={isChecked}
            onChange={() =>
              cardUpdateHandler(cardId, "dueComplete", !isChecked)
            }
          />
        </ButtonGroup>
      </CardContent>
    </Card>
  )
}

export default HoverCard
