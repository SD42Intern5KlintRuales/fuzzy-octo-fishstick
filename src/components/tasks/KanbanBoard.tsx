import {
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import type {
  TaskResponse,
  TaskStatus,
} from "@/services/taskApi";

interface Props {
  tasks: TaskResponse[];
  onStatusChange?: (
    taskId: string,
    status: TaskStatus
  ) => void;
}

export default function KanbanBoard({
  tasks,
  onStatusChange,
}: Props) {
  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "DONE"
  );

  const handleDragEnd = (
    event: DragEndEvent
  ) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const status = over.id as TaskStatus;

    console.log({
      taskId,
      status,
    });

    onStatusChange?.(taskId, status);
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <KanbanColumn
          title="To Do"
          status="TODO"
          tasks={todoTasks}
        />

        <KanbanColumn
          title="In Progress"
          status="IN_PROGRESS"
          tasks={inProgressTasks}
        />

        <KanbanColumn
          title="Done"
          status="DONE"
          tasks={doneTasks}
        />
      </div>
    </DndContext>
  );
}
