import { useEffect, useMemo, useState } from "react";
import EisenhowerColumn from "@/components/eisenhower/EisenhowerColumn";
import {
    taskApi,
    EisenhowerQuadrant,
    type TaskResponse,
    type EisenhowerAnalyticsResponse,
    type EisenhowerQuadrant as EisenhowerQuadrantType,
} from "@/services/taskApi";

const quadrantConfig: {
    key: EisenhowerQuadrantType;
    title: string;
    description: string;
    colorClass: string;
}[] = [
    {
        key: EisenhowerQuadrant.DO_FIRST,
        title: "Do First",
        description: "Urgent and important",
        colorClass: "bg-red-100 text-red-700",
    },
    {
        key: EisenhowerQuadrant.DECIDE,
        title: "Decide",
        description: "Important but not urgent",
        colorClass: "bg-blue-100 text-blue-700",
    },
    {
        key: EisenhowerQuadrant.DELEGATE,
        title: "Delegate",
        description: "Urgent but less important",
        colorClass: "bg-yellow-100 text-yellow-700",
    },
    {
        key: EisenhowerQuadrant.DELETE,
        title: "Delete",
        description: "Not urgent and not important",
        colorClass: "bg-slate-200 text-slate-700",
    },
];

export default function Eisenhower() {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [analytics, setAnalytics] = useState<
        Partial<EisenhowerAnalyticsResponse>
    >({});
    const [loading, setLoading] = useState(true);
    const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
    const [error, setError] = useState("");

    async function loadEisenhowerData() {
        try {
            setLoading(true);
            setError("");

            const [tasksResponse, analyticsResponse] = await Promise.all([
                taskApi.getTasks(),
                taskApi.getEisenhowerAnalytics(),
            ]);

            setTasks(tasksResponse.data);
            setAnalytics(analyticsResponse.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load Eisenhower matrix.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEisenhowerData();
    }, []);

    const groupedTasks = useMemo(() => {
        return {
            DO_FIRST: tasks.filter(
                (task) => task.eisenhowerQuadrant === EisenhowerQuadrant.DO_FIRST
            ),
            DECIDE: tasks.filter(
                (task) =>
                    task.eisenhowerQuadrant === EisenhowerQuadrant.DECIDE ||
                    task.eisenhowerQuadrant === null
            ),
            DELEGATE: tasks.filter(
                (task) => task.eisenhowerQuadrant === EisenhowerQuadrant.DELEGATE
            ),
            DELETE: tasks.filter(
                (task) => task.eisenhowerQuadrant === EisenhowerQuadrant.DELETE
            ),
        };
    }, [tasks]);

    async function handleDropTask(
        taskId: string,
        quadrant: EisenhowerQuadrantType
    ) {
        const currentTask = tasks.find((task) => task.taskId === taskId);

        if (!currentTask) return;

        if (currentTask.eisenhowerQuadrant === quadrant) return;

        try {
            setUpdatingTaskId(taskId);
            setError("");

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task.taskId === taskId
                        ? {
                              ...task,
                              eisenhowerQuadrant: quadrant,
                          }
                        : task
                )
            );

            const response = await taskApi.changeEisenhower(taskId, {
                quadrant,
            });

            const updatedTask = response.data;

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task.taskId === taskId ? updatedTask : task
                )
            );

            const analyticsResponse = await taskApi.getEisenhowerAnalytics();
            setAnalytics(analyticsResponse.data);
        } catch (error) {
            console.error(error);
            setError("Failed to update task quadrant.");

            await loadEisenhowerData();
        } finally {
            setUpdatingTaskId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-500">
                    Loading Eisenhower matrix...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Eisenhower Matrix
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Drag tasks between boxes to update urgency and importance.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {quadrantConfig.map((item) => (
                            <div
                                key={item.key}
                                className="rounded-xl border border-slate-200 px-4 py-3 text-center"
                            >
                                <p className="text-lg font-bold text-slate-800">
                                    {analytics[item.key] ??
                                        groupedTasks[item.key].length}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {updatingTaskId && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    Updating task...
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {quadrantConfig.map((item) => (
                    <EisenhowerColumn
                        key={item.key}
                        title={item.title}
                        description={item.description}
                        quadrant={item.key}
                        tasks={groupedTasks[item.key]}
                        colorClass={item.colorClass}
                        onDropTask={handleDropTask}
                    />
                ))}
            </div>
        </div>
    );
}