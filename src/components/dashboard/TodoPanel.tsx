import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
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
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <section className="bg-[#f5f7ff] rounded-xl shadow-xl p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList
                size={18}
                className="text-[#2f3a8f]"
              />

              <h3 className="text-red-500 text-sm font-semibold">
                To-Do
              </h3>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-[11px] text-gray-400 hover:text-red-500"
          >
            <span className="text-red-500">+</span>
            Add task
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-500">
              No tasks found.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
              />
            ))
          )}
        </div>
      </section>

      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadTasks}
      />
    </>
  );
}