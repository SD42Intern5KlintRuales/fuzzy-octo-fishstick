import { MoreHorizontal } from "lucide-react";
import type { TaskResponse } from "@/services/taskApi";

interface CompletedTaskCardProps {
  task: TaskResponse;
}

export default function CompletedTaskCard({
  task,
}: CompletedTaskCardProps) {
  return (
    <article className="border border-gray-300 rounded-xl bg-[#f9fbff] p-3 flex justify-between gap-3">
      <div className="flex gap-2 flex-1">
        <span className="w-3 h-3 rounded-full border-2 border-green-500 mt-1 shrink-0" />

        <div>
          <h4 className="text-[13px] font-bold mb-2">
            {task.title}
          </h4>

          <p className="text-[11px] text-gray-500 leading-snug max-w-[170px]">
            {task.description}
          </p>

          <small className="block text-[8px] text-gray-500 mt-2">
            Status: <b className="text-green-600">Completed</b>
          </small>

          <small className="block text-[8px] text-gray-500 mt-1">
            Completed on{" "}
            {new Date(task.updatedAt).toLocaleDateString()}
          </small>
        </div>
      </div>

      <div className="w-[70px] flex flex-col items-end">
        <MoreHorizontal size={15} className="text-gray-400" />
      </div>
    </article>
  );
}