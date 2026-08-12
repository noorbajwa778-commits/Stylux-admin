import Header from "../components/header.jsx";
import StatCard from "../components/statcard.jsx";
import RecentOrders from "../components/recentorders.jsx";
import PendingApprovals from "../components/pendingapprovals.jsx";
import OrderStatusSummary from "../components/orderstatus.jsx";
import { ShoppingBag, Users, CheckCircle, DollarSign } from "lucide-react";
import { orders } from "../data/orders.js";
import { users } from "../data/users.js";

export default function Dashboard() {
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back, Admin! Here's what's happening."
      />

      <div className="px-8 pb-8 space-y-6">
        <div className="flex flex-wrap gap-5">
          <StatCard
            icon={ShoppingBag}
            iconBg="bg-gradient-to-br from-pink to-purple"
            label="Total Orders"
            value={totalOrders}
            change="+12%"
          />
          <StatCard
            icon={Users}
            iconBg="bg-gradient-to-br from-purple to-pink"
            label="Total Users"
            value={totalUsers}
            change="+8%"
          />
          <StatCard
            icon={CheckCircle}
            iconBg="bg-gradient-to-br from-pink to-purple"
            label="Completed"
            value={completedOrders}
            change="+5%"
          />
          <StatCard
            icon={DollarSign}
            iconBg="bg-gradient-to-br from-purple to-pink"
            label="Revenue"
            value={`Rs ${totalRevenue.toLocaleString()}`}
            change="+20%"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <RecentOrders />
          <div className="flex flex-col gap-6 w-full md:w-80">
            <PendingApprovals />
            <OrderStatusSummary />
          </div>
        </div>
      </div>
    </div>
  );
}