import type { TaskResponse, EisenhowerQuadrant } from "@/services/taskApi";
import { TaskPriority, TaskStatus } from "@/services/taskApi";

interface EisenhowerColumnProps {
    title: string;
    description: string;
    quadrant: EisenhowerQuadrant;
    tasks: TaskResponse[];
    colorClass: string;
    onDropTask: (taskId: string, quadrant: EisenhowerQuadrant) => void;
}

function formatPriority(priority: TaskResponse["priority"]) {
    switch (priority) {
        case TaskPriority.LOW:
            return "Low";
        case TaskPriority.MEDIUM:
            return "Moderate";
        case TaskPriority.HIGH:
            return "High";
        case TaskPriority.URGENT:
            return "Urgent";
        default:
            return priority;
    }
}

function formatStatus(status: TaskResponse["status"]) {
    switch (status) {
        case TaskStatus.TODO:
            return "To Do";
        case TaskStatus.IN_PROGRESS:
            return "In Progress";
        case TaskStatus.DONE:
            return "Completed";
        default:
            return status;
    }
}

export default function EisenhowerColumn({
    title,
    description,
    quadrant,
    tasks,
    colorClass,
    onDropTask,
}: EisenhowerColumnProps) {
    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();

        const taskId = event.dataTransfer.getData("taskId");

        if (!taskId) return;

        onDropTask(taskId, quadrant);
    }

    return (
        <section
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="min-h-[360px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
            <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {description}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}
                >
                    {tasks.length}
                </span>
            </div>

            <div className="space-y-3">
                {tasks.length === 0 ? (
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-400">
                        Drop tasks here
                    </div>
                ) : (
                    tasks.map((task) => (
                        <article
                            key={task.taskId}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData("taskId", task.taskId);
                            }}
                            className="cursor-grab rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-slate-100 active:cursor-grabbing"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        {task.title}
                                    </h3>

                                    {task.description && (
                                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                                            {task.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                <span className="rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-700">
                                    {formatPriority(task.priority)}
                                </span>

                                <span className="rounded-full bg-slate-200 px-2 py-1 font-medium text-slate-700">
                                    {formatStatus(task.status)}
                                </span>

                                {task.dueDate && (
                                    <span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-700">
                                        Due: {task.dueDate}
                                    </span>
                                )}
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}