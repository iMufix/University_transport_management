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
import { Complaints } from './pages/Complaints';
import { AdminLayout } from './layouts/AdminLayout';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center p-8 text-gray-500 font-medium">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const quickLinks = [
    { name: 'Manage Fleet', path: '/dashboard/buses', desc: 'Assign buses and drivers dynamically to schedules.', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', roles: ['admin'] },
    { name: 'Routes Explorer', path: '/dashboard/routes', desc: 'Configure dropoff points and align timing metrics.', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', roles: ['admin', 'student', 'driver'] },
    { name: 'Allocations', path: '/dashboard/students', desc: 'Automatically assign students to capacities.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', roles: ['admin'] },
    { name: 'Attendance Log', path: '/dashboard/attendance', desc: 'Track student flow via actively logged data.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', roles: ['admin', 'student', 'driver'] },
    { name: 'Push Alerts', path: '/dashboard/notifications', desc: 'Broadcast global alerts to designated endpoints.', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', roles: ['admin', 'student', 'driver'] },
    { name: 'Issue Reports', path: '/dashboard/complaints', desc: 'Fix commute complaints and correct anomalies.', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', roles: ['admin', 'student'] }
  ];

  const allowedLinks = quickLinks.filter(link => link.roles.includes(user?.role));

  return (
    <AdminLayout title="System Dashboard">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 p-6 sm:p-8 rounded-2xl md:rounded-3xl mb-8 md:mb-10 text-center sm:text-left shadow-sm mt-2 sm:mt-4 relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-xl sm:text-2xl text-gray-900 font-medium">Welcome securely back, <strong className="font-extrabold text-blue-900">{user?.name}</strong>!</p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 md:px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
             <span className="text-gray-500 text-xs sm:text-sm font-semibold tracking-wide uppercase">Detected Identity Mode:</span>
             <span className="uppercase tracking-widest font-black text-blue-800 bg-white px-2.5 py-1 rounded-md border border-blue-200 shadow-sm text-xs">{user?.role}</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none transform translate-x-12 -translate-y-4">
          <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
      </div>

      {user?.role === 'admin' && <AnalyticsDashboard />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {allowedLinks.map((item, index) => (
          <Link key={index} to={item.path} className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-50 rounded-xl flex justify-center items-center mb-4 sm:mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100 group-hover:border-blue-500">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors text-base sm:text-lg">{item.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed opacity-90">{item.desc}</p>
             </div>
          </Link>
        ))}
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

      <Route path="/dashboard/complaints" element={
        <ProtectedRoute>
          <Complaints />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
