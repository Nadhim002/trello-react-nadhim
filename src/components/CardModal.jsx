import React, {
  useEffect,
  useState,
} from "react"
import {
  Card,
  Modal,
  Typography,
  Stack,
  Grid,
  Button,
  Alert,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import AddUsingModal from "./addHelper/AddUsingModal"
import { toast } from "react-toastify"
import CheckList from "./CheckList"
import Spinner from "./spinner/Spinner"
import { setSelectedCard } from "../features/selectedCardSlice.js"
import axios from "axios"
import { addCheckList } from "../backend/checkListCalls.js"
import { setData as setCheckListData, add as addCheckListAction, setError as setCheckListError } from "../features/checkListSlice.js"
import { setData as setCheckItemData } from "../features/checkItemSlice.js"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "70vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  display: "flex",
  flexDirection: "column",
  gap: 2,
}

export default function CardModal() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { checkListsData } = useSelector(state => state.checkList)
  const selectedCardInfo = useSelector(state => state.selectedCard)
  const { id: cardId, name: selectedCardName } = selectedCardInfo
  const dispatch = useDispatch()


  useEffect(() => {

    async function getCardInfo(cardId) {
      try {
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



        dispatch(setCheckListData(checkListData))
        dispatch(setCheckItemData(checkItemData))

      } catch (err) {

        setError(true)

      } finally {

        setLoading(false)

      }
    }

    getCardInfo(selectedCardInfo.id)
  }, [selectedCardInfo])



  async function addNewCheckListHandler(checkListName) {
    try {
      const id = toast.loading("Check List Creation Started ...")
      const checkListResponse = await addCheckList(checkListName, cardId)
      const checkList = checkListResponse.data

      dispatch(addCheckListAction(checkList))

      toast.update(id, {
        render: `Sucessfully added ${checkListResponse?.data?.name}`,
        type: "success",
        isLoading: false,
        autoClose: 500,
      })
    } catch (err) {

      dispatch(setCheckListError(err))

      toast.update(id, {
        render: err.message,
        type: "error",
        isLoading: false,
        autoClose: 500,
      })

    }
  }

  return (

    <Modal
      open={Boolean(selectedCardInfo)}
      onClose={() => setSelectedCard(null)}
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
            {selectedCardName ?? "Name Not Found"}
          </Typography>
          <AddUsingModal
            addHandler={addNewCheckListHandler}
            toAddName={"Check List"}
          >
            <Button variant="contained">Add new check list</Button>
          </AddUsingModal>
        </Stack>

        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert severity="error">"Something went Wrong</Alert>
        ) : (
          <Grid container spacing={2}>
            {checkListsData.length == 0 ? (
              <div>Add Check List to Show</div>
            ) : (
              checkListsData.map((checkList) => (
                <CheckList key={checkList.id} checkList={checkList} />
              ))
            )}
          </Grid>
        )}
      </Card>
    </Modal>
  )
}
