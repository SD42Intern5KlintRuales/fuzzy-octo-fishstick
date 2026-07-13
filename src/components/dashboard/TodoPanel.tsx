import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";

import TaskCard from "./TaskCard";
import AddTaskModal from "../tasks/AddTaskModal";

import {
  taskApi,
  type TaskResponse,
} from "@/services/taskApi";

export default function TodoPanel() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [open, setOpen] = useState(false);

  const loadTasks = async () => {
    try {
      const response = await taskApi.getTasks();

      const todoTasks = response.data.filter(
        (task) => task.status === "TODO"
      );

      setTasks(todoTasks);
    } catch (error) {
      console.error(
        "Failed to load tasks:",
        error
      );
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AssignmentIcon
                  sx={{
                    color: "#2f3a8f",
                  }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "error.main",
                    fontWeight: 600,
                  }}
                >
                  To-Do
                </Typography>
              </Box>
            </Box>

            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add Task
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {tasks.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                No tasks found.
              </Typography>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                />
              ))
            )}
          </Box>
        </CardContent>
      </Card>

      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadTasks}
      />
    </>
  );
}