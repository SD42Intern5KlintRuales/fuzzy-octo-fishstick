import { MoreHorizontal } from "lucide-react";
import type { TaskResponse } from "@/services/taskApi";

interface TaskCardProps {
  task: TaskResponse;
}

export default function TaskCard({ task }: TaskCardProps) {
  const dotColor =
    task.status === "TODO"
      ? "border-red-500"
      : task.status === "IN_PROGRESS"
      ? "border-blue-600"
      : "border-green-500";

  const textColor =
    task.status === "TODO"
      ? "text-red-500"
      : task.status === "IN_PROGRESS"
      ? "text-blue-600"
      : "text-green-500";

  return (
    <article className="min-h-[116px] border border-gray-300 rounded-xl bg-[#f9fbff] p-3 flex justify-between gap-3">
      <div className="flex gap-3 flex-1">
        <span
          className={`w-3 h-3 rounded-full border-2 ${dotColor} mt-1 shrink-0`}
        />

        <div>
          <h4 className="text-[13px] font-bold mb-2">
            {task.title}
          </h4>

          <p className="text-[11px] text-gray-500">
            {task.description}
          </p>

          <div className="flex gap-4 mt-4 text-[9px]">
            <span>
              Priority:
              <b className="text-sky-600 ml-1">
                {task.priority}
              </b>
            </span>

            <span>
              Status:
              <b className={`${textColor} ml-1`}>
                {task.status}
              </b>
            </span>
            <span>
                Due:
                <b className="text-xs text-red-600">
                    {task.dueDate ?? "---"}
                </b>
            </span>
          </div>
        </div>
      </div>

      <div className="w-[90px] flex flex-col items-end">
        <MoreHorizontal
          size={15}
          className="text-gray-400"
        />

        <small className="text-[8px] text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </small>
      </div>
    </article>
  );
}