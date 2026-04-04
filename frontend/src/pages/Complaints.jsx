import { useState, useEffect, useContext } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export const Complaints = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  const [complaints, setComplaints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({ message: '' });
  const [filterStatus, setFilterStatus] = useState('');

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaints');
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/complaints', formData);
      setIsModalOpen(false);
      setSuccessMsg('Complaint submitted securely directly to administration.');
      setFormData({ message: '' });
      fetchComplaints();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/complaints/${id}`, { status });
      setSuccessMsg(`Ticket status seamlessly updated to [${status.toUpperCase()}]`);
      fetchComplaints();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComplaint = async (id) => {
    if (window.confirm('Are you certain you want to completely purge this ticket?')) {
      try {
        await api.delete(`/complaints/${id}`);
        fetchComplaints();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredComplaints = filterStatus 
    ? complaints.filter(c => c.status === filterStatus) 
    : complaints;

  return (
    <AdminLayout title="Issues & Feedback">
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-sm flex items-center animate-fade-in-up">
          <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end justify-between hover:shadow-md transition-shadow">
        <div className="w-full md:w-64">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Filter by Resolution State</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-900 outline-none text-sm bg-white cursor-pointer font-medium"
          >
            <option value="">All Tickets</option>
            <option value="open">Current / Open</option>
            <option value="in-progress">Actively In-Progress</option>
            <option value="resolved">Resolved & Closed</option>
          </select>
        </div>
        
        {isStudent && (
          <div className="w-full md:w-56">
            <Button onClick={() => setIsModalOpen(true)}>
              <div className="flex items-center justify-center font-bold">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                Report New Issue
              </div>
            </Button>
          </div>
        )}
      </div>

      <Table headers={['Student Origin', 'Ticket Message', 'Date Subscribed', 'Status Marker', 'Admin Actions']}>
        {filteredComplaints.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm font-medium">
              <span className="block text-3xl mb-3 opacity-80">🎉</span>
              No complaints found within the network filters.
            </td>
          </tr>
        ) : (
          filteredComplaints.map((complaint) => (
            <tr key={complaint._id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-9 w-9 bg-orange-50 text-orange-700 border border-orange-100 font-extrabold flex items-center justify-center rounded-full text-xs uppercase shadow-sm">
                    {complaint.studentId?.name ? complaint.studentId.name.charAt(0) : '?'}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-gray-900">{complaint.studentId?.name || "Unknown User System"}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{complaint.studentId?.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 font-medium border-b border-gray-50">
                <p className="truncate block w-full max-w-[200px] xl:max-w-md">{complaint.message}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium border-b border-gray-50">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-50">
                {isAdmin ? (
                  <select
                    value={complaint.status}
                    onChange={(e) => handleUpdateStatus(complaint._id, e.target.value)}
                    className={`text-xs font-bold px-2 py-1 rounded-md border shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition-colors ${
                      complaint.status === 'open' ? 'bg-red-50 text-red-700 border-red-200' :
                      complaint.status === 'in-progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    <option value="open">Action: SET OPEN</option>
                    <option value="in-progress">Action: SET IN-PROGRESS</option>
                    <option value="resolved">Action: SET RESOLVED</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border shadow-sm ${
                      complaint.status === 'open' ? 'bg-red-50 text-red-700 border-red-200' :
                      complaint.status === 'in-progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    {complaint.status.toUpperCase()}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-50">
                <button 
                  onClick={() => deleteComplaint(complaint._id)} 
                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 uppercase tracking-wide text-xs font-bold"
                >
                  Delete Ticket
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>

      {isStudent && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Open Service Ticket">
          {error && <div className="mb-5 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-2">
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
                Detailed Issue Description
              </label>
              <textarea
                id="message"
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Explain the incident, route mismatch, or issue clearly..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-shadow text-sm"
              />
            </div>
            
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              Your feedback is written directly to the high-level transit authority database block. Please remain concise and descriptive.
            </p>

            <div className="pt-4 flex gap-3 border-t border-gray-100">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50 transition shadow-sm">
                Cancel
              </button>
              <div className="flex-1">
                <Button type="submit" isLoading={loading}>Push to Admin</Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
