import type { DashboardResponse } from "@/types/dashboard";
import StatusCircle from "./StatusCircle";

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
          ((data?.inProgressTasks ?? 0) / totalTasks) * 100
        )
      : 0;

  const todoPercentage =
    totalTasks > 0
      ? Math.round(
          ((data?.todoTasks ?? 0) / totalTasks) * 100
        )
      : 0;

  return (
    <section className="rounded-xl bg-[#f5f7ff] p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-red-500">
          Task Status
        </h3>

        <span className="text-xs text-gray-500">
          Total: {totalTasks}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        <StatusCircle
          value={donePercentage}
          label={`Done (${data?.doneTasks ?? 0})`}
          color="#22c55e"
        />

        <StatusCircle
          value={progressPercentage}
          label={`Progress (${data?.inProgressTasks ?? 0})`}
          color="#3b82f6"
        />

        <StatusCircle
          value={todoPercentage}
          label={`To Do (${data?.todoTasks ?? 0})`}
          color="#ef4444"
        />
      </div>
    </section>
  );
}
