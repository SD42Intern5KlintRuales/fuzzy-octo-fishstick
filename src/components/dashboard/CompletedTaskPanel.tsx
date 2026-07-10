import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import CompletedTaskCard from "./CompletedTaskCard";
import {
  taskApi,
  type TaskResponse,
} from "@/services/taskApi";

export default function CompletedTaskPanel() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await taskApi.getTasks();

        const completedTasks = response.data.filter(
          (task) => task.status === "DONE"
        );

        setTasks(completedTasks);

        console.log(
          "Completed tasks:",
          completedTasks
        );
      } catch (error) {
        console.error(
          "Failed to load completed tasks:",
          error
        );
      }
    };

    loadTasks();
  }, []);

  return (
    <section className="bg-[#f5f7ff] rounded-xl shadow-xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <ClipboardCheck
          size={18}
          className="text-[#2f3a8f]"
        />

        <h3 className="text-red-500 text-sm font-semibold">
          Completed Tasks
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">
            No completed tasks.
          </p>
        ) : (
          tasks.map((task) => (
            <CompletedTaskCard
              key={task.taskId}
              task={task}
            />
          ))
        )}
      </div>
    </section>
  );
}