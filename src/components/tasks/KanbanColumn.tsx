import { useDroppable } from "@dnd-kit/core";

import type { TaskResponse } from "@/services/taskApi";
import KanbanTaskCard from "./KanbanTaskCard";

interface Props {
  title: string;
  status: string;
  tasks: TaskResponse[];
}

const columnStyles = {
  TODO: {
    bg: "bg-red-50",
    dot: "bg-red-500",
  },
  IN_PROGRESS: {
    bg: "bg-blue-50",
    dot: "bg-blue-500",
  },
  DONE: {
    bg: "bg-green-50",
    dot: "bg-green-500",
  },
};

export default function KanbanColumn({
  title,
  status,
  tasks,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const style =
    columnStyles[
      status as keyof typeof columnStyles
    ];

  return (
    <div
      ref={setNodeRef}
      className={`
        ${style.bg}
        rounded-2xl
        border
        border-slate-200
        p-4
        min-h-[700px]
        shadow-sm
      `}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${style.dot}`}
          />

          <h2 className="font-semibold text-slate-700">
            {title}
          </h2>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
            No tasks yet
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task.taskId}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
}