import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsSection from "@/components/dashboard/StatsSection";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />

        <div className="mt-6 space-y-6">
          <WelcomeCard />

          <StatsSection />
        </div>
      </main>
    </div>
  );
}
