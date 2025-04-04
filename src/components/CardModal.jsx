import React, { useEffect, useReducer } from "react"
import { Card, Modal, Typography, Stack, Grid } from "@mui/material"
import { CheckListReducer, checkItemReducer } from "../reducers/reducers.js"
import axios from "axios"
import AddCheckList from "./AddCheckList.jsx"
import { toast } from "react-toastify"
import CheckList from "./CheckList"

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   maxHeight: "50vh",
//   overflowY: "auto",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
// }

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "70vh", // Increased height
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24, // More modern shadow
  borderRadius: 2, // Rounded corners
  p: 3, // Add padding
  display: "flex",
  flexDirection: "column",
  gap: 2, // Add consistent gap between elements
}

export default function CardModal({ selectedCardInfo, setSelectedCardInfo }) {
  const [checkListData, checkListDispatch] = useReducer(CheckListReducer, [])
  const [checkItemData, checkItemDispatch] = useReducer(checkItemReducer, {})

  useEffect(() => {
    async function getCardInfo(cardId) {
      const checkListResponse = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/checklists`,
        {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )

      const responseData = checkListResponse.data

      const checkListData = []
      const checkItemData = {}

      responseData.forEach((checkList) => {
        const checkListId = checkList.id
        const { checkItems, ...otherInfoOfCheckList } = checkList
        checkItemData[checkListId] = checkList["checkItems"]
        checkListData.push(otherInfoOfCheckList)
      })

      checkListDispatch({
        type: "set_data",
        data: checkListData,
      })

      checkItemDispatch({
        type: "set_data",
        data: checkItemData,
      })
    }

    getCardInfo(selectedCardInfo.id)
  }, [])

  async function addNewCheckListHandler(checkListName) {
    try {
      const checkListResponse = await axios.post(
        `https://api.trello.com/1/checklists`,
        {},
        {
          params: {
            name: checkListName,
            idCard: selectedCardInfo.id,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
          },
        }
      )
      checkListDispatch({
        type: "add",
        checkList: checkListResponse.data,
      })
      toast.success("Added Sucessfully")
    } catch (err) {
      toast.error("Something went wrong")
    }
  }


  return (
    <Modal
      open={Boolean(selectedCardInfo)}
      onClose={() => setSelectedCardInfo(null)}
      sx={{ backdropFilter: "blur(2px)" }}
    >
      <Card sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            pb: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {selectedCardInfo?.name ?? "Name Not Found"}
          </Typography>
          <AddCheckList addNewCheckListHandler={addNewCheckListHandler} />
        </Stack>

        <Grid container spacing={2}>
          {checkListData &&
            checkListData.map((checkList) => (
              <CheckList
                key={checkList.id}
                checkList={checkList}
                checkItemData={checkItemData?.[checkList.id]}
                checkListDispatch={checkListDispatch}
                checkItemDispatch={checkItemDispatch}
              />
            ))}
        </Grid>
      </Card>
    </Modal>
  )
}
