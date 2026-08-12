import { Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import Requests from './pages/requests.jsx'
import Salons from './pages/salons.jsx'
import SalonDetail from './pages/salondetail.jsx'
import Orders from './pages/orders.jsx'
import Users from './pages/users.jsx'
import Reviews from './pages/reviews.jsx'
import Settings from './pages/settings.jsx'
import DashboardLayout from './components/dashboardlayout.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/salons" element={<Salons />} />
        <Route path="/salons/:id" element={<SalonDetail />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App