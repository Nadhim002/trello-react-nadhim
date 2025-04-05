import React, { useState, useRef } from "react";
import { Card, TextField, Button, IconButton, Stack, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function AddTemplate({ addHandler, width, addName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const cardRef = useRef(null);

  function addHandlerHelper() {
    if (inputValue.trim()) {
      addHandler(inputValue);
      setInputValue("");
    }
    setIsEditing(false);
  }

  return (
    <Card
      ref={cardRef}
      elevation={isEditing ? 4 : 1}
      sx={{
        width: width ?? 250,
        backgroundColor: isEditing ? "#f5f8ff" : "white",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        border: isEditing ? "1px solid #3f51b5" : "1px solid #e0e0e0",
        overflow: "visible",
      }}
    >
      {isEditing ? (
        <Box p={2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addHandlerHelper();
            }}
          >
            <Stack spacing={2}>
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                autoFocus
                variant="outlined"
                placeholder={`Enter ${addName} name`}
                onBlur={(e) => {
                  if (!cardRef.current?.contains(e.relatedTarget)) {
                    setIsEditing(false);
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#3f51b5",
                    },
                  },
                }}
                size="small"
              />
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#3f51b5",
                    borderRadius: "8px",
                    textTransform: "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#303f9f",
                    },
                  }}
                  fullWidth
                >
                  {`Add ${addName}`}
                </Button>
                <IconButton
                  type="button"
                  onClick={() => setIsEditing(false)}
                  sx={{
                    color: "#666",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    width: "36px",
                    height: "36px",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </form>
        </Box>
      ) : (
        <Button
          startIcon={<AddIcon sx={{ color: "#3f51b5" }} />}
          fullWidth
          onClick={() => {
            setIsEditing(true);
          }}
          sx={{
            justifyContent: "flex-start",
            color: "#666",
            padding: "12px 16px",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(63, 81, 181, 0.08)",
            },
          }}
        >
          {`Add a ${addName}`}
        </Button>
      )}
    </Card>
  )
}