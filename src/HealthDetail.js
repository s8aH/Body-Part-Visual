import React, { Component, Fragment } from "react";
import { Box, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";

export default function HealthDetail({ onClick, title, icon, content }) {
  return (
    <div>
      <Button class="myButton" onClick={onClick}>
        X
      </Button>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <img alt={title} src={icon} style={{ width: 70, height: 60 }} />
        <h1>{title}</h1>
      </Stack>
      {content}
      <Box textAlign="center">
        <Button
          variant="contained"
          style={{
            borderRadius: 35,
            backgroundColor: "#21b6ae",
            padding: "10px 24px",
            fontSize: "14px",
            color: "white"
          }}
        >
          Find out more
        </Button>
      </Box>
    </div>
  );
}
