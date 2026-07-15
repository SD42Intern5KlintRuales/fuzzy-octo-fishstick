import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Topbar() {
  const today = new Date();

  const dayName = today.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    }
  );

  const date = today.toLocaleDateString("en-GB");

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        bgcolor: "white",
        color: "black",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: 4,
          gap: 4,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <Box
            component="span"
            sx={{ color: "#2563eb" }}
          >
            Task
          </Box>
          Ma
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 610,
            ml: 6,
          }}
        >
          <OutlinedInput
            fullWidth
            placeholder="Search your task here..."
            sx={{
              height: 44,
              bgcolor: "#f7f8fc",
              borderRadius: 2,

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 1,
                    bgcolor: "#2f3a8f",
                    color: "white",

                    "&:hover": {
                      bgcolor: "#243074",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <IconButton
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#2f3a8f",
              color: "white",

              "&:hover": {
                bgcolor: "#243074",
              },
            }}
          >
            <NotificationsIcon fontSize="small" />
          </IconButton>

          <IconButton
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#2f3a8f",
              color: "white",

              "&:hover": {
                bgcolor: "#243074",
              },
            }}
          >
            <CalendarMonthIcon fontSize="small" />
          </IconButton>

          <Box sx={{ ml: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
              }}
            >
              {dayName}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#0ea5e9",
              }}
            >
              {date}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}