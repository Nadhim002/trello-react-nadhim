import { useState } from "react"
import { Modal, Box, Input, Button, ButtonGroup } from "@mui/material"
import { toast } from "react-toastify"

export default function CreateBoardModal({
  open,
  addNewBoardHandler,
  setOpen,
}) {
  const [boardName, setBoardName] = useState("")

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (boardName.trim() == "") {
            toast.error("Board Name cannot be empty")
            return
          }
          addNewBoardHandler(boardName)
          setOpen(false)
        }}
      >
        <Box sx={style}>
          <Input
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            placeholder="Enter Board Name to Add"
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
  )
}
