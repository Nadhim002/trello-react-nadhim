import React, { useState } from "react"
import { Modal, Button, Box, Input, ButtonGroup } from "@mui/material"
import { toast } from "react-toastify"

export default function AddCheckList({ addNewCheckListHandler }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    backdropFilter: "blur(2px)",
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [checkListName, setCheckListName] = useState("")

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add new check list</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (checkListName.trim() == "") {
              toast.error("check list Name cannot be empty")
              return
            }
            addNewCheckListHandler(checkListName)
            setOpen(false)
          }}
        >
          <Box sx={style}>
            <Input
              onChange={(e) => setCheckListName(e.target.value)}
              value={checkListName}
              placeholder="Enter Check Lis Name to Add"
            />
            <ButtonGroup sx={{ padding: 4, gap: 2, display: "flex" }}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  textDecoration: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  marginLeft: "8px",
                  "&:hover": {
                    backgroundColor: "#e57373",
                  },
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  )
}
