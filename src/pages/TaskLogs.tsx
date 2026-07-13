import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function TaskLogs() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Task ID",
      width: 100,
    },
    {
      field: "taskName",
      headerName: "Task Name",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      width: 180,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      renderCell: (params) => {
        const color =
          params.value === "High"
            ? "error"
            : params.value === "Medium"
            ? "warning"
            : "success";

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
          />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const color =
          params.value === "Completed"
            ? "success"
            : params.value === "In Progress"
            ? "warning"
            : "default";

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
          />
        );
      },
    },
    {
      field: "createdDate",
      headerName: "Created",
      width: 140,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 140,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: () => (
        <>
          <IconButton color="primary">
            <VisibilityIcon />
          </IconButton>

          <IconButton color="warning">
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      taskName: "Implement Login Page",
      assignedTo: "Klint",
      priority: "High",
      status: "Completed",
      createdDate: "2026-07-10",
      dueDate: "2026-07-12",
    },
    {
      id: 2,
      taskName: "Create Dashboard",
      assignedTo: "John",
      priority: "Medium",
      status: "In Progress",
      createdDate: "2026-07-11",
      dueDate: "2026-07-15",
    },
    {
      id: 3,
      taskName: "Integrate API",
      assignedTo: "Sarah",
      priority: "High",
      status: "Pending",
      createdDate: "2026-07-12",
      dueDate: "2026-07-18",
    },
    {
      id: 4,
      taskName: "Create Reports Module",
      assignedTo: "Michael",
      priority: "Low",
      status: "Completed",
      createdDate: "2026-07-09",
      dueDate: "2026-07-20",
    },
  ];

  return (
    <div className="p-6">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
        variant="h4"
        sx={{ fontWeight: 600 }}
        >
        Task Logs
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Task
        </Button>
      </Box>

      <div className="h-[600px] w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 2,
            backgroundColor: "white",
          }}
        />
      </div>
    </div>
  );
}