import { useSelector } from "react-redux";
import Header from "../components/header.jsx";
import StatCard from "../components/statcard.jsx";
import RecentAppointments from "../components/recentappointments.jsx";
import PendingApprovals from "../components/pendingapprovals.jsx";
import OrderStatusSummary from "../components/appointmentstatus.jsx";
import { CalendarCheck, Users, CheckCircle, DollarSign } from "lucide-react";

export default function Dashboard() {
  const appointments = useSelector((state) => state.adminData.appointments);
  const clients = useSelector((state) => state.adminData.clients);

  const completed = appointments.filter(
    (a) => (a.status || "").toLowerCase() === "completed"
  );
  const totalRevenue = completed.reduce(
    (sum, a) => sum + Number(a.amount || 0),
    0
  );

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back, Admin! Here's what's happening."
      />

      <div className="px-8 pb-8 space-y-6">
        <div className="flex flex-wrap gap-5">
          <StatCard
            icon={CalendarCheck}
            iconBg="bg-gradient-to-br from-pink to-purple"
            label="Total Appointments"
            value={appointments.length}
          />
          <StatCard
            icon={Users}
            iconBg="bg-gradient-to-br from-purple to-pink"
            label="Total Users"
            value={clients.length}
          />
          <StatCard
            icon={CheckCircle}
            iconBg="bg-gradient-to-br from-pink to-purple"
            label="Completed"
            value={completed.length}
          />
          <StatCard
            icon={DollarSign}
            iconBg="bg-gradient-to-br from-purple to-pink"
            label="Revenue"
            value={`Rs ${totalRevenue.toLocaleString()}`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <RecentAppointments />
          <div className="flex flex-col gap-6 w-full md:w-80">
            <PendingApprovals />
            <OrderStatusSummary />
          </div>
        </div>
      </div>
    </div>
  );
}