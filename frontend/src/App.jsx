import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { BusManagement } from './pages/BusManagement';
import { RouteManagement } from './pages/RouteManagement';
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
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group block opacity-60">
          <div className="h-10 w-10 bg-gray-50 rounded-lg flex justify-center items-center mb-4 group-hover:bg-blue-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900">Preferences</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">Update system profile parameters and configure visual output.</p>
        </div>
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
