import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsSection from "@/components/dashboard/StatsSection";

import { taskApi } from "@/services/taskApi";
import type { DashboardResponse } from "@/types/dashboard";

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardResponse | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response =
          await taskApi.getDashboard();

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <MainLayout>
      <WelcomeCard />
      <StatsSection data={stats} />
    </MainLayout>
  );
}