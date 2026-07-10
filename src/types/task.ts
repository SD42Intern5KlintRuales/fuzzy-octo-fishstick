export interface Task {
    id: number;
    title: string;
    description: string;
    priority: "Low" | "Moderate" | "High";
    status: "To Do" | "In Progress" | "Completed"
    createdAt: string;
}

export interface CompletedTask {
    id: number;
    title: string;
    description: string;
    completedAt: string;
}