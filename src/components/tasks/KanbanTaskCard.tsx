import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { TaskResponse } from "@/services/taskApi";

interface Props {
  task: TaskResponse;
}

const priorityColors = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

export default function KanbanTaskCard({
  task,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: task.taskId,
  });

  const style = {
    transform: CSS.Translate.toString(
      transform
    ),
    willChange: "transform",
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="
        cursor-grab
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      <h3 className="font-semibold">
        {task.title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {task.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="text-xs text-slate-400">
            Due {task.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}