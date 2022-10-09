import React from "react";
import {
  Typography,
  Box,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";

import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";

const MobileTable = ({
  headers = [],
  rows = [],
  key = "d",
  isLoading = false,
}) => {
  const [page, setPage] = React.useState(0);
  return (
    <>
      {headers.length > 0 &&
        rows.length > 0 &&
        !isLoading &&
        headers.map((header, index) => (
          <>
            <Typography align="center" mb={2} mt={1} key={key + header + index}>
              <b>{header}</b>
            </Typography>
            <Typography align="center" mb={1}>
              {rows[page][index]}
            </Typography>
            <Divider />
          </>
        ))}
      {headers.length > 0 &&
        isLoading &&
        headers.map((header, index) => (
          <>
            <Typography align="center" mb={2} mt={1} key={key + header + index}>
              <b>{header}</b>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              <CircularProgress />
            </Box>
            <Divider />
          </>
        ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <IconButton
          sx={{ background: "#131A36", mr: 1, borderRadius: 2 }}
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          <ChevronLeftSharpIcon />
        </IconButton>
        <Box sx={{ border: "1px solid #fff", px: 2, py: 1, borderRadius: 2 }}>
          {page + 1}
        </Box>
        <IconButton
          sx={{ background: "#131A36", ml: 1, borderRadius: 2 }}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= rows.length - 1}
        >
          <ChevronRightSharpIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default MobileTable;
