import React, { useState } from "react"
import { Modal, Button, Box, Input, ButtonGroup } from "@mui/material"
import { toast } from "react-toastify"

export default function AddUsingModal({ children, toAddName, addHandler }) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f0f0f0",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    backdropFilter: "blur(2px)",
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "") {
      toast.error(`${toAddName} name cannot be empty`)
      return
    }
    addHandler(inputValue)
    setInputValue("")
    handleClose()
  }

  return (
    <>
      <span onClick={handleOpen} style={{ cursor: "pointer" }}>
        {children}
      </span>

      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder={`Enter ${toAddName} name`}
              fullWidth
              autoFocus
            />

            <ButtonGroup sx={{ padding: 4, gap: 2, display: "flex" }}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Add
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  "&:hover": { backgroundColor: "#e57373" },
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Box>
        </form>
      </Modal>
    </>
  )
}
