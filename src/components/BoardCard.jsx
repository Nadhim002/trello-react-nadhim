import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

export default function BoardCard({ boardData }) {
  const navigate = useNavigate();

  function onBoardClickHandler(boardId) {
    navigate(`/${boardId}`);
  }

  return (
    <Grid
      container
      sx={{
        width: "200px",
        height: "120px",
        backgroundColor: boardData.prefs.backgroundColor,
        backgroundImage: `url(${boardData.prefs.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "20px",
        "&:hover": {
          opacity: 0.9,
          cursor: "pointer",
        },
      }}
      onClick={() => onBoardClickHandler(boardData.id)}
    >
      <Typography
        variant="h6"
        sx={{ padding: 2, color: "white", fontWeight: 900 }}
      >
        {boardData.name}
      </Typography>
    </Grid>
  );
}
