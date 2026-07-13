import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

interface StatusCircleProps {
  value: number;
  label: string;
  color: string;
}

export default function StatusCircle({
  value,
  label,
  color,
}: StatusCircleProps) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={74}
          sx={{
            color: "#d9d9d9",
            position: "absolute",
          }}
        />

        <CircularProgress
          variant="determinate"
          value={value}
          size={74}
          sx={{ color }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
            }}
          >
            {value}%
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: color,
          }}
        />

        <Typography variant="caption">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}