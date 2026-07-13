import api from "../api/api";
import type { DashboardResponse } from "@/types/dashboard";

export const TaskStatus = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    DONE: "DONE",
} as const;

export type TaskStatus =
    (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    URGENT: "URGENT",
} as const;

export type TaskPriority =
    (typeof TaskPriority)[keyof typeof TaskPriority];

export const EisenhowerQuadrant = {
    DO_FIRST: "DO_FIRST",
    DECIDE: "DECIDE",
    DELEGATE: "DELEGATE",
    DELETE: "DELETE",
} as const;

export type EisenhowerQuadrant =
    (typeof EisenhowerQuadrant)[keyof typeof EisenhowerQuadrant];

export interface TaskRequest {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;
}

export interface ChangeStatusRequest {
    status: TaskStatus;
}

export interface ChangeEisenhowerRequest {
    quadrant: EisenhowerQuadrant;
}

export interface TaskResponse {
    taskId: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    userId: string;

    eisenhowerQuadrant: EisenhowerQuadrant | null;
    urgent: boolean | null;
    important: boolean | null;
}

export type EisenhowerAnalyticsResponse = Record<EisenhowerQuadrant, number>;

export const taskApi = {
    getDashboard: () =>
        api.get<DashboardResponse>("/users/tasks/dashboard"),

    getTasks: () =>
        api.get<TaskResponse[]>("/users/tasks"),

    getTask: (taskId: string) =>
        api.get<TaskResponse>(`/tasks/${taskId}`),

    createTask: (data: TaskRequest) =>
        api.post<TaskResponse>("/users/tasks", data),

    updateTask: (taskId: string, data: TaskRequest) =>
        api.put<TaskResponse>(`/tasks/${taskId}`, data),

    changeStatus: (
        taskId: string,
        data: ChangeStatusRequest
    ) =>
        api.patch<TaskResponse>(`/tasks/${taskId}/status`, data),

    changeEisenhower: (
        taskId: string,
        data: ChangeEisenhowerRequest
    ) =>
        api.patch<TaskResponse>(`/tasks/${taskId}/eisenhower`, data),

    getTasksByEisenhowerQuadrant: (
        quadrant: EisenhowerQuadrant
    ) =>
        api.get<TaskResponse[]>(
            `/users/tasks/eisenhower?quadrant=${quadrant}`
        ),

    getEisenhowerAnalytics: () =>
        api.get<EisenhowerAnalyticsResponse>(
            "/users/tasks/eisenhower/analytics"
        ),

    deleteTask: (taskId: string) =>
        api.delete(`/tasks/${taskId}`),
};