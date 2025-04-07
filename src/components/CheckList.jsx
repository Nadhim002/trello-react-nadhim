import React, { useContext } from "react"
import {
  Card,
  Checkbox,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddTemplate from "./addHelper/AddTemplate"
import { toast } from "react-toastify"
import axios from "axios"
import { useCardModelContext } from "./CardModal"

export default function CheckList({ checkList }) {
  const { checkListDispatch, checkItemData, checkItemDispatch } =
    useCardModelContext()

  const { name: checkListName, id: checkListId, idCard: cardId } = checkList
  const checkItemDataOfGivenCheckList = checkItemData[checkListId] ?? []

  async function checkListDeleteHandler(checkListId) {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}`,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      if (response.status == 200) {
        console.log(checkListId)
        checkListDispatch({
          type: "delete",
          checkListId: checkListId,
        })
        toast.success(`Check List has been Deleted scucessfully`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  async function addCheckItemHandler(newCheckItemName) {
    const id = toast.loading("Check Item Creation Started...")

    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
        {},
        {
          params: {
            name: newCheckItemName,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      const newCheckItem = response.data

      toast.update(id, {
        render: `${newCheckItem.name} Check Item has been added`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })

      checkItemDispatch({
        type: "add",
        newCheckItem: newCheckItem,
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

  async function checkItemDeleteHandler(checkListId, checkItemId) {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      if (response.status == 200) {
        checkItemDispatch({
          type: "delete",
          checkListId: checkListId,
          checkItemId: checkItemId,
        })

        toast.success(`Check Item has been Deleted scucessfully`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  async function checkItemStatusHandler(
    cardId,
    checkListId,
    checkItemId,
    checked
  ) {
    try {
      const response = await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checklist/${checkListId}/checkItem/${checkItemId}`,
        {},
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
            state: checked ? "complete" : "incomplete",
          },
        }
      )

      const updatedCheckItem = response.data

      checkItemDispatch({
        type: "update",
        updatedCheckItem: updatedCheckItem,
      })
    } catch (err) {
      toast.error(err.message)
    }
  }

  const progress = calculateProgress(checkItemDataOfGivenCheckList)

  function calculateProgress(checkItemData) {
    const noOfItemsCompleted = checkItemData.reduce(
      (completedCount, checkItem) => {
        if (checkItem?.state == "complete") {
          completedCount++
        }
        return completedCount
      },
      0
    )
    return (noOfItemsCompleted * 100) / (checkItemData.length || 1)
  }

  return (
    <Card
      sx={{
        bgcolor: "#21262d",
        color: "white",
        p: 2,
        width: 400,
        flexGrow: 1,
        borderRadius: 2,
        boxShadow: 1,
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">{checkListName}</Typography>
        </div>
        <Button
          variant="contained"
          onClick={() => checkListDeleteHandler(checkListId)}
          sx={{ color: "white" }}
        >
          <Typography variant="button" >Destroy</Typography>
        </Button>
      </div>

      {checkItemDataOfGivenCheckList && (
        <List>
          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ bgcolor: "gray", height: 5, my: 1 }}
          />
          <Typography variant="caption">{Math.round(progress)}%</Typography>

          {checkItemDataOfGivenCheckList.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                pl: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                checked={item.state !== "incomplete"}
                onChange={() =>
                  checkItemStatusHandler(
                    cardId,
                    checkListId,
                    item.id,
                    item.state == "incomplete"
                  )
                }
                sx={{ color: "white", mr: 1 }}
              />

              <ListItemText
                primary={item.name}
                sx={{ flexGrow: 1, color: "white" }}
              />

              <IconButton
                onClick={() => checkItemDeleteHandler(checkListId, item.id)}
                sx={{ color: "white" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <AddTemplate addHandler={addCheckItemHandler} addName={"CheckItem"} />
    </Card>
  )
}
