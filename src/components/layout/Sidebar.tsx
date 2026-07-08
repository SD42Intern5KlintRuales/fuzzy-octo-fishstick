import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-indigo-900 text-white">
      {/* Profile */}
      <div className="flex flex-col items-center border-b border-indigo-800 p-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="h-16 w-16 rounded-full"
        />

        <h2 className="text-gray-200">
          klint@example.com
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg bg-white px-4 py-3 text-indigo-900">
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-indigo-800">
              <CheckSquare size={18} />
              My Tasks
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-indigo-800">
              <FolderKanban size={18} />
              Categories
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-indigo-800">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}