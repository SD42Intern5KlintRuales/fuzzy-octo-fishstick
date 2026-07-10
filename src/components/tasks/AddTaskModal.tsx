import { useState } from "react";
import { taskApi, TaskPriority } from "@/services/taskApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTaskModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [priority, setPriority] =
    useState<TaskPriority>("MEDIUM");

  if (!open) return null;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await taskApi.createTask({
        title,
        description,
        priority,
        dueDate
      });

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-xl font-semibold">
          Add Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded border p-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded border p-2"
            rows={4}
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as TaskPriority
              )
            }
            className="w-full rounded border p-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">
              Medium
            </option>
            <option value="HIGH">High</option>
            <option value="URGENT">
              Urgent
            </option>
          </select>
            
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded border p-2"
            />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-indigo-600 px-4 py-2 text-white"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}