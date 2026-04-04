import { useState, useEffect } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { InputField } from '../components/InputField';
import api from '../services/api';

export const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [buses, setBuses] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    busId: '',
    status: 'Present',
    date: new Date().toISOString().split('T')[0]
  });

  const [filterDate, setFilterDate] = useState('');
  const [filterBus, setFilterBus] = useState('');

  const fetchData = async () => {
    try {
      const [attRes, stdRes, busRes] = await Promise.all([
        api.get('/attendance'),
        api.get('/students'),
        api.get('/buses')
      ]);
      setAttendance(attRes.data);
      setStudents(stdRes.data);
      setBuses(busRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await api.post('/attendance/mark', formData);
      setIsModalOpen(false);
      setSuccessMsg('Attendance marked successfully!');
      
      setFormData({
        ...formData,
        studentId: '',
        busId: ''
      });
      fetchData();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record attendance. Check for duplicates.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendance = attendance.filter(record => {
    const dMatch = filterDate ? record.date === filterDate : true;
    const bMatch = filterBus ? (record.busId && record.busId._id === filterBus) : true;
    return dMatch && bMatch;
  });

  const totalPresent = filteredAttendance.filter(a => a.status === 'Present').length;
  const totalAbsent = filteredAttendance.filter(a => a.status === 'Absent').length;

  return (
    <AdminLayout title="Attendance Engine">
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-sm flex items-center animate-fade-in-up">
          <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center group hover:bg-gray-50 transition-colors">
          <h4 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Present Analytics</h4>
          <span className="text-4xl font-extrabold text-green-600">{totalPresent}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center items-center group hover:bg-gray-50 transition-colors">
          <h4 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Absent Analytics</h4>
          <span className="text-4xl font-extrabold text-red-500">{totalAbsent}</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Date Span Filter</label>
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-900 outline-none text-sm transition-shadow"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Fleet Line Filter</label>
            <select 
              value={filterBus}
              onChange={(e) => setFilterBus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-900 outline-none text-sm bg-white transition-shadow cursor-pointer"
            >
              <option value="">All Running Buses</option>
              {buses.map(bus => (
                <option key={bus._id} value={bus._id}>Bus {bus.busNumber}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full md:w-56">
          <Button onClick={() => setIsModalOpen(true)}>
            <div className="flex items-center justify-center font-bold">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4V4zm2 2v2h2V6H6zm10-2h6v6h-6V4zm2 2v2h2V6h-2zM4 14h6v6H4v-6zm2 2v2h2v-2H6zm10-2h3v2h-3v-2zm-2 0h2v4h-2v-4zm4 2h2v4h-2v-4zm-2 2h2v2h-2v-2zm-6-2h2v4h-2v-4zm-2-2h2v2h-2v-2z" /></svg>
              Input QR / Manual Scan
            </div>
          </Button>
        </div>
      </div>

      <Table headers={['Student Information', 'Active Bus Register', 'Logged Date', 'Presence Status']}>
        {filteredAttendance.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-12 text-center text-gray-400 text-sm font-medium">
              <span className="block text-3xl mb-3 opacity-80">📇</span>
              No attendance records found within the tracking logs.
            </td>
          </tr>
        ) : (
          filteredAttendance.map((record) => (
            <tr key={record._id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-50">
                <div className="text-sm font-bold text-gray-900">{record.studentId?.name || "Unknown Identity"}</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">{record.studentId?.department || "N/A Department"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium border-b border-gray-50">
                <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md border border-gray-200 shadow-sm font-mono text-xs shadow-white">
                  {record.busId?.busNumber || "Unknown Route Line"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-gray-50">
                <span className="font-semibold text-gray-700">{record.date}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-50">
                {record.status === 'Present' ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-black bg-green-50 text-green-700 border border-green-200">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 shadow-sm shadow-green-200"></span> PRESENT
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-black bg-red-50 text-red-700 border border-red-200">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 shadow-sm shadow-red-200"></span> ABSENT
                  </span>
                )}
              </td>
            </tr>
          ))
        )}
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Simulate Entry / QR Override">
        {error && <div className="mb-5 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Target Student Object</label>
            <select
              required
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-shadow cursor-pointer"
            >
              <option value="" disabled>Locate student ID profile...</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>{s.name} — {s.department}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Target Bus Line</label>
            <select
              required
              value={formData.busId}
              onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-shadow cursor-pointer"
            >
              <option value="" disabled>Locate assignment bus network...</option>
              {buses.map(b => (
                <option key={b._id} value={b._id}>Bus Line {b.busNumber}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Log Date Match"
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <div className="mb-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Presence Logic</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-shadow cursor-pointer font-bold"
              >
                <option value="Present" className="text-green-700">Set Present</option>
                <option value="Absent" className="text-red-700">Set Absent</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-gray-500 font-medium tracking-wide border-t border-gray-100 pt-3">
            Submitting this command simulates a hardware QR code scan generated from the student's mobile portal. Duplicate events will be filtered natively.
          </p>

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
              Cancel Execution
            </button>
            <div className="flex-1">
              <Button type="submit" isLoading={loading}>Write Log</Button>
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
