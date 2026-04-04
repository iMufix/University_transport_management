import { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import api from '../services/api';

export const AnalyticsDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [attendanceTrend, setAttendanceTrend] = useState([]);
  const [busUsage, setBusUsage] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [overviewRes, trendRes, usageRes] = await Promise.all([
        api.get('/analytics/overview'),
        api.get('/analytics/attendance-trend'),
        api.get('/analytics/bus-usage')
      ]);
      setOverview(overviewRes.data);
      setAttendanceTrend(trendRes.data);
      setBusUsage(usageRes.data);
    } catch (err) {
      console.error("Analytics fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-2 mb-10 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-gray-100 animate-pulse rounded-2xl w-full border border-gray-50"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-gray-100 animate-pulse rounded-2xl w-full border border-gray-50"></div>
          <div className="h-72 bg-gray-100 animate-pulse rounded-2xl w-full border border-gray-50"></div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Active Fleet Count", value: overview?.totalBuses, icon: "bus" },
    { label: "Subscribed Students", value: overview?.totalStudents, icon: "users" },
    { label: "Mapped Destinations", value: overview?.totalRoutes, icon: "map" },
    { label: "Open Tickets", value: overview?.totalComplaints - overview?.resolvedComplaints || 0, icon: "alert" }
  ];

  return (
    <div className="w-full mt-2 mb-10 animate-fade-in-up">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">System Data Telemetry</h2>
        <button 
          onClick={fetchAnalytics}
          className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-blue-600 shadow-sm transition flex items-center font-bold"
        >
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Sync Graph
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-start relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 z-10">{stat.label}</p>
             <h4 className="text-3xl font-black text-gray-900 z-10">{stat.value || 0}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Daily Boarding Tracking (Present)
          </h3>
          <div className="h-64 w-full">
            {attendanceTrend.length === 0 ? (
               <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-wider">No Telemetry Recorded Yet</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dx={-10} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="Present" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span> Active Fleet Saturation Targets
          </h3>
          <div className="h-64 w-full">
            {busUsage.length === 0 ? (
               <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-wider">No Fleet Models Resolved</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={busUsage} maxBarSize={45}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dx={-10} allowDecimals={false} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="Students" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
