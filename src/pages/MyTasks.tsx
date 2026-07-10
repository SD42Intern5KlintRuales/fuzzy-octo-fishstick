import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import KanbanBoard from "@/components/tasks/KanbanBoard";

import {
  taskApi,
  type TaskResponse,
} from "@/services/taskApi";

export default function MyTasks() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const loadTasks = async () => {
    try {
      const response = await taskApi.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My Tasks
        </h1>

        <p className="text-slate-500">
          Organize and track your work.
        </p>
      </div>

      <KanbanBoard
        tasks={tasks}
        onStatusChange={async (
            taskId,
            status
        ) => {
            await taskApi.changeStatus(
            taskId,
            { status }
            );

            await loadTasks();
        }}
        />
    </MainLayout>
  );
}