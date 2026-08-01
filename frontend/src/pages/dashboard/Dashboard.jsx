import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import useAuth from "../../hooks/useAuth";

import { getDashboardStats } from "../../services/dashboardService";

import StatCard from "../../components/StatCard";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import RecentPolicies from "../../components/RecentPolicies";
import QuickActions from "../../components/QuickActions";

function Dashboard() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    customers: 0,
    activePolicies: 0,
    claims: 0,
    premiumCollection: 0,
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    const data = await getDashboardStats();

    setStats(data);

  };

  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Welcome,
          {" "}
          {user?.name}

        </h1>

        <p className="text-gray-600 mt-2">

          Insurance Management Dashboard

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Customers"
          value={stats.customers}
          color="bg-blue-600"
        />

        <StatCard
          title="Active Policies"
          value={stats.activePolicies}
          color="bg-green-600"
        />

        <StatCard
          title="Claims"
          value={stats.claims}
          color="bg-orange-500"
        />

        <StatCard
          title="Premium Collection"
          value={`₹ ${stats.premiumCollection}`}
          color="bg-purple-600"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

    <PieChart />

    <BarChart />

</div>

<div className="grid lg:grid-cols-2 gap-6 mt-8">

    <RecentPolicies />

    <QuickActions />

</div>

    </MainLayout>

  );
}

export default Dashboard;