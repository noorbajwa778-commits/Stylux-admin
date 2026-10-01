import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Requests from "./pages/requests.jsx";
import Salons from "./pages/salons.jsx";
import SalonDetail from "./pages/salondetail.jsx";
import Appointments from "./pages/appointments.jsx";
import Users from "./pages/users.jsx";
import Reviews from "./pages/reviews.jsx";
import Notifications from "./pages/notifications.jsx";
import Settings from "./pages/settings.jsx";
import DashboardLayout from "./components/dashboardlayout.jsx";

function App() {
  const { user } = useSelector((state) => state.home);

  return (
    <Routes>
      {user.id ? (
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/salons" element={<Salons />} />
          <Route path="/salons/:id" element={<SalonDetail />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      ) : (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
}

export default App;