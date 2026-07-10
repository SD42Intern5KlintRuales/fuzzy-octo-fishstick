export interface DashboardResponse {
    totalTasks: number;
    todoTasks: number;
    inProgressTasks: number;
    doneTasks: number;
    lowPriorityTasks: number;
    mediumPriorityTasks: number;
    highPriorityTasks: number;
    urgentPriorityTasks: number;
}
