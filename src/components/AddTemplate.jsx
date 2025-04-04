import React, { useState, useRef } from "react"
import { Card, TextField, Button, IconButton, Stack } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"

export default function AddTemplate({ addHandler , width , addName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const cardRef = useRef(null)

  function addHandlerHelper() {
    if (inputValue.trim()) {
      addHandler(inputValue)
      setInputValue("")
    }
    setIsEditing(false)
  }

  return (
    <Card
      ref={cardRef}
      sx={{
        width:  width ?? 250 ,
        backgroundColor: isEditing ? "black" : "#f0f0f0",
        borderRadius: "12px",
        color: isEditing ? "white" : "black",
      }}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addHandlerHelper()
          }}
        >
          <Stack>
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              autoFocus
              variant="outlined"
              placeholder= {`Enter here to add a ${addName}` ?? ""}
              onBlur={(e) => {
                if (!cardRef.current?.contains(e.relatedTarget)) {
                  setIsEditing(false)
                }
              }}
              sx={{ backgroundColor: "white", borderRadius: "4px", mb: 1 }}
            />
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {`Add ${addName}`}
              </Button>
              <IconButton
                type="button"
                onClick={() => setIsEditing(false)}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
        </form>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          onClick={() => {
            setIsEditing(true)
          }}
          sx={{ justifyContent: "flex-start", color: "black" }}
        >
          {`Add a ${addName}`}

        </Button>
      )}
    </Card>
  )
}
