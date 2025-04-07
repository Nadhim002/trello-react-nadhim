import React, {
  useEffect,
  useReducer,
  useContext,
  createContext,
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
import { CheckListReducer, checkItemReducer } from "../reducers/reducers.js"
import axios from "axios"
import { useBoardPageContext } from "../pages/BoardPage"
import AddUsingModal from "./addHelper/AddUsingModal"
import { toast } from "react-toastify"
import CheckList from "./CheckList"
import Spinner from "./spinner/Spinner"
import { Helmet } from "react-helmet"

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

const cardModelContext = createContext()
export function useCardModelContext() {
  return useContext(cardModelContext)
}

export default function CardModal() {
  const { selectedCardInfo, setSelectedCardInfo } = useBoardPageContext()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [checkListData, checkListDispatch] = useReducer(CheckListReducer, [])
  const [checkItemData, checkItemDispatch] = useReducer(checkItemReducer, {})

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

        checkListDispatch({
          type: "set_data",
          data: checkListData,
        })

        checkItemDispatch({
          type: "set_data",
          data: checkItemData,
        })
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

      toast.update(id, {
        render: `Sucessfully added ${checkListResponse?.data?.name}`,
        type: "success",
        isLoading: false,
        autoClose: 500,
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

  return (
    <cardModelContext.Provider
      value={{
        checkListData,
        checkListDispatch,
        checkItemData,
        checkItemDispatch,
      }}
    >
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
              {checkListData.length == 0 ? (
                <div>Add Check List to Show</div>
              ) : (
                checkListData.map((checkList) => (
                  <CheckList key={checkList.id} checkList={checkList} />
                ))
              )}
            </Grid>
          )}
        </Card>
      </Modal>
    </cardModelContext.Provider>
  )
}
