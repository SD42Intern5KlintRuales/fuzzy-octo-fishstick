import type { Task, CompletedTask } from "../types/task";

export const todoTasks: Task[] = [
  {
    id: 1,
    title: "Attend Max Verstappen's Birthday Party",
    description:
      "Buy gifts on the way and pick up cake from the bakery. Fresh Elements...",
    priority: "Moderate",
    status: "To Do",
    createdAt: "20/06/2023",
  },
  {
    id: 2,
    title: "Landing Page Design for TravelDays",
    description:
      "Get the work done by EOD and discuss with client before leaving.",
    priority: "Moderate",
    status: "In Progress",
    createdAt: "20/06/2023",
  },
  {
    id: 3,
    title: "Presentation on Final Product",
    description:
      "Make sure everything is functioning and all the necessities are properly met.",
    priority: "Moderate",
    status: "In Progress",
    createdAt: "19/06/2023",
  },
];

export const completedTasks: CompletedTask[] = [
  {
    id: 1,
    title: "Walk the dog",
    description: "Take the dog to the park and bring treats as well.",
    completedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Conduct meeting",
    description: "Meet with the client and finalize requirements.",
    completedAt: "2 days ago",
  },
];