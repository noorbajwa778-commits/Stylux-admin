import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar.jsx";
import { fetchSalons } from "../redux/redux/Slices/SalonsSlice.js";
import { fetchAdminData } from "../redux/redux/Slices/AdminDataSlice.js";

export default function DashboardLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = () => {
      dispatch(fetchSalons());
      dispatch(fetchAdminData());
    };
    load();
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-cream">
        <Outlet />
      </main>
    </div>
  );
}