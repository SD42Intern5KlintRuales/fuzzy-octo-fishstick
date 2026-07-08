import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          className="w-80 rounded-lg border pl-10 pr-4 py-2 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg border p-2">
          <Bell size={18} />
        </button>

        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </span>
      </div>
    </header>
  );
}