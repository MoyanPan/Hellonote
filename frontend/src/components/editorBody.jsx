import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function EditorBody({ code }) {
  return (
    <div style={{ width: "100%" }}>
      <Box
        component="span"
        sx={{
          display: "block",
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        {code}
      </Box>
      <Box>
        <Button> RUN </Button>
      </Box>
    </div>
  );
}