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
import axios from "axios"
import { toast } from "react-toastify"
import { useBoardPageContext } from "../pages/BoardPage"

function HoverCard({ cardData }) {
  const { setSelectedCardInfo, cardDispatch } = useBoardPageContext()
  const [hover, setHover] = useState(false)
  const { id: cardId, idList: listId, name: cardName } = cardData
  const isChecked = cardData.dueComplete

  async function cardUpdateHandler(
    cardId,
    toChangeCardAtrribute,
    toChangeBoolean
  ) {
    try {
      const responseCard = await axios.put(
        `https://api.trello.com/1/cards/${cardId}`,
        {},
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
            [toChangeCardAtrribute]: toChangeBoolean,
          },
        }
      )

      const updatedCard = responseCard.data

      cardDispatch({
        type: "change_status",
        updatedCard: updatedCard,
      })
      toast.success(`${updatedCard.name} card has been updated scucessfully`)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }
  
  async function cardDeleteHandler(cardId, listId) {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/cards/${cardId}`,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      if (response.status == 200) {
        cardDispatch({
          type: "delete",
          cardId: cardId,
          listId: listId,
        })

        toast.success(`Card has been Deleted scucessfully`)
      } else {
        toast.error("Something went wrong")
      }
    } catch {
      toast.error("Something went wrong")
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
          onClick={() => setSelectedCardInfo(cardData)}
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
