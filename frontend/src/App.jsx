import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { BusManagement } from './pages/BusManagement';
import { RouteManagement } from './pages/RouteManagement';
import { StudentManagement } from './pages/StudentManagement';
import { AttendanceManagement } from './pages/AttendanceManagement';
import { Notifications } from './pages/Notifications';
import { AdminLayout } from './layouts/AdminLayout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center p-8 text-gray-500 font-medium">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <AdminLayout title="Dashboard Home">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 p-6 rounded-2xl mb-10 text-center sm:text-left shadow-sm mt-4">
        <p className="text-xl text-gray-900 font-medium">Welcome back, <strong className="font-extrabold text-blue-900">{user?.name}</strong>!</p>
        <p className="text-gray-500 text-sm mt-2 font-medium">Access Profile: <span className="uppercase tracking-wider font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm ml-1">{user?.role}</span></p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/dashboard/buses" className="bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group block">
          <div className="h-10 w-10 bg-gray-50 rounded-lg flex justify-center items-center mb-4 group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </div>
          <h3 className="font-bold text-gray-900">Manage Fleet (Buses)</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Assign buses and drivers dynamically to active schedules and zones.</p>
        </Link>
        
        <Link to="/dashboard/routes" className="bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group block">
          <div className="h-10 w-10 bg-gray-50 rounded-lg flex justify-center items-center mb-4 group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
          </div>
          <h3 className="font-bold text-gray-900">Routes Explorer</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Configure dropoff points and align timing metrics seamlessly.</p>
        </Link>
        
        <Link to="/dashboard/students" className="bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group block">
          <div className="h-10 w-10 bg-gray-50 rounded-lg flex justify-center items-center mb-4 group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900">Student Allocations</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Automatically assign students to buses using smart location matching.</p>
        </Link>

        <Link to="/dashboard/attendance" className="bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group block">
          <div className="h-10 w-10 bg-gray-50 rounded-lg flex justify-center items-center mb-4 group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          </div>
          <h3 className="font-bold text-gray-900">Attendance Log</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Track student flow via simulated QR check-ins and review boarding logs.</p>
        </Link>
        
        <Link to="/dashboard/notifications" className="bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group block">
          <div className="h-10 w-10 bg-gray-50 rounded-lg flex justify-center items-center mb-4 group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <h3 className="font-bold text-gray-900">Push Notifications</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Broadcast global alerts or target specific drivers and student mobile interfaces natively.</p>
        </Link>
      </div>
    </AdminLayout>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/buses" element={
        <ProtectedRoute>
          <BusManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/routes" element={
        <ProtectedRoute>
          <RouteManagement />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/students" element={
        <ProtectedRoute>
          <StudentManagement />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/attendance" element={
        <ProtectedRoute>
          <AttendanceManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
