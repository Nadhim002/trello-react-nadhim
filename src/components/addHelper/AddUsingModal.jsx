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
    bgcolor: "white",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    pt: 3,
    px: 4,
    pb: 3,
    backdropFilter: "blur(5px)",
    outline: "none",
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
            <h2
              style={{
                marginBottom: "20px",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Add {toAddName}
            </h2>

            <Input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder={`Enter ${toAddName} name`}
              fullWidth
              autoFocus
              sx={{
                padding: "10px",
                marginBottom: "24px",
                "&:before": { borderBottom: "2px solid gray" },
                "&:after": { borderBottom: "2px solid black" },
              }}
            />

            <ButtonGroup
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: "transparent",
                  color: "#666",
                  border: "1px solid #ddd",
                  padding: "8px 16px",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  padding: "8px 16px",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Add
              </Button>
            </ButtonGroup>
          </Box>
        </form>
      </Modal>
    </>
  )
}
