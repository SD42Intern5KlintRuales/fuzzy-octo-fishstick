import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import StatusCircle from "./StatusCircle";

import type { DashboardResponse } from "@/types/dashboard";

interface Props {
  data: DashboardResponse | null;
}

export default function TaskStatusPanel({
  data,
}: Props) {
  const totalTasks = data?.totalTasks ?? 0;

  const donePercentage =
    totalTasks > 0
      ? Math.round(
          ((data?.doneTasks ?? 0) / totalTasks) * 100
        )
      : 0;

  const progressPercentage =
    totalTasks > 0
      ? Math.round(
          ((data?.inProgressTasks ?? 0) /
            totalTasks) *
            100
        )
      : 0;

  const todoPercentage =
    totalTasks > 0
      ? Math.round(
          ((data?.todoTasks ?? 0) / totalTasks) * 100
        )
      : 0;

  return (
    <Card elevation={3}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            color="error"
          >
            Task Status
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total: {totalTasks}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <StatusCircle
            value={donePercentage}
            label={`Done (${data?.doneTasks ?? 0})`}
            color="#22c55e"
          />

          <StatusCircle
            value={progressPercentage}
            label={`Progress (${
              data?.inProgressTasks ?? 0
            })`}
            color="#3b82f6"
          />

          <StatusCircle
            value={todoPercentage}
            label={`To Do (${data?.todoTasks ?? 0})`}
            color="#ef4444"
          />
        </Box>
      </CardContent>
    </Card>
  );
}