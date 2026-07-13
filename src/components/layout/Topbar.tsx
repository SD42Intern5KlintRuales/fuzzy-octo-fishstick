import { Search, Bell, CalendarDays } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white shadow-lg flex items-center gap-9 px-16 max-lg:px-8 max-md:h-auto max-md:flex-wrap max-md:py-5">
      <h1 className="text-2xl font-extrabold whitespace-nowrap">
        <span className="text-blue-600">Task</span>Ma
      </h1>

      <div className="flex flex-1 max-w-[610px] h-11 bg-[#f7f8fc] shadow-xl rounded overflow-hidden ml-24 max-xl:ml-6 max-md:order-3 max-md:w-full max-md:max-w-none max-md:ml-0">
        <input
          type="text"
          placeholder="Search your task here..."
          className="flex-1 bg-transparent px-5 text-xs outline-none"
        />

        <button className="w-12 bg-[#2f3a8f] text-white grid place-items-center">
          <Search size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-md bg-[#2f3a8f] text-white grid place-items-center">
          <Bell size={15} />
        </button>

        <button className="w-8 h-8 rounded-md bg-[#2f3a8f] text-white grid place-items-center">
          <CalendarDays size={15} />
        </button>

        <div className="ml-4 text-[11px] flex flex-col">
          <strong>Tuesday</strong>
          <span className="text-sky-500">20/06/2023</span>
        </div>
      </div>
    </header>
  );
}