import TodoPanel from "./TodoPanel";
import TaskStatusPanel from "./TaskStatusPanel";
import CompletedTaskPanel from "./CompletedTaskPanel";
import type { DashboardResponse } from "@/types/dashboard";

interface Props {
  data: DashboardResponse | null;
}

export default function StatsSection({ data }: Props) {
  return (
    <div className="grid grid-cols-12 gap-6 mt-6">
      <div className="col-span-12 lg:col-span-7">
        <TodoPanel />
      </div>

      <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
        <TaskStatusPanel data={data} />
        <CompletedTaskPanel />
      </div>
    </div>
  );
}
