export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type EisenhowerQuadrant =
  | "DO_FIRST"
  | "DECIDE"
  | "DELEGATE"
  | "DELETE";

export interface Task {
  taskId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string;

  eisenhowerQuadrant?: EisenhowerQuadrant | null;
  urgent?: boolean | null;
  important?: boolean | null;
}

export interface CompletedTask {
  taskId: string;
  title: string;
  description: string;
  completedAt: string;
}