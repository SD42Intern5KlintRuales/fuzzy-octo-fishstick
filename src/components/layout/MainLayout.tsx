import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <div className="flex-1 min-w-0 overflow-y-auto">
        <Topbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}