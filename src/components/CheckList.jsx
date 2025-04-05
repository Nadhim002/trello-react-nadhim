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
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddTemplate from "./addHelper/AddTemplate"
import { toast } from "react-toastify"
import axios from "axios"
import {useCardModelContext} from "./CardModal"

export default function CheckList({
  checkList,
  checkItemData,
  checkListDispatch,
  checkItemDispatch,
}) {

  // const {
  //   checkListDispatch,
  //   checkItemData,
  //   checkItemDispatch,
  // } = useCardModelContext()


  const { name, id, idCard } = checkList

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
    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${id}/checkItems`,
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

      toast.success("Done and Dusted")

      checkItemDispatch({
        type: "add",
        newCheckItem: newCheckItem,
      })
    } catch (err) {
      toast.error(err.message)
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
          <Typography variant="h6">{name}</Typography>
        </div>
        <Button
          onClick={() => checkListDeleteHandler(id)}
          sx={{ color: "white" }}
        >
          <Typography variant="button">Destroy</Typography>
        </Button>
      </div>

      {checkItemData && (
        <List>
          {checkItemData.map((item) => (
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
                    idCard,
                    id,
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
                onClick={() => checkItemDeleteHandler(id, item.id)}
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

{
  /* Title & Delete Button */
}

//   {/* Progress Bar */}
//   <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: "gray", height: 5, my: 1 }} />
//   <Typography variant="caption">{Math.round(progress)}%</Typography>

{
  /* Checklist Items */
}

//   {/* Add Item Input & Button */}
//   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//     <TextField
//       value={newItem}
//       onChange={(e) => setNewItem(e.target.value)}
//       variant="outlined"
//       size="small"
//       sx={{ bgcolor: "white", borderRadius: 1, flexGrow: 1 }}
//     />
//     <Button
//       variant="contained"
//       onClick={handleAddItem}
//       sx={{ bgcolor: "gray", color: "white", textTransform: "none" }}
//     >
//       Add an item
//     </Button>
//   </div>
