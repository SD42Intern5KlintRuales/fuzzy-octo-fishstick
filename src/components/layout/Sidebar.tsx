import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Grid2X2,
  LayoutDashboardIcon,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const {
    user,
    fetchUser,
    logout,
  } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col bg-indigo-900 text-white">
      <div className="flex flex-col items-center border-b border-indigo-800 p-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="h-16 w-16 rounded-full"
        />

        <h2 className="mt-3 text-center font-semibold">
          {user
            ? `${user.firstName} ${user.lastName}`
            : "Loading..."}
        </h2>

        <p className="text-center text-sm text-gray-200">
          {user?.email ?? ""}
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white hover:text-black">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/mytasks" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white hover:text-black">
              <CheckSquare size={18} />
              My Tasks
            </Link>
          </li>

          <li>
            <Link to="/eisenhower" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white hover:text-black">
              <Grid2X2 size={18} />
              Eisenhower
            </Link>
          </li>

          <li>
            <Link to="/tasklogs" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-white hover:text-black">
              <LayoutDashboard size={18} />
              TaskLogs
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-indigo-800"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}