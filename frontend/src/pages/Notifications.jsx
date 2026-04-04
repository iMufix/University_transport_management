import { useState, useEffect, useContext } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { InputField } from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export const Notifications = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetRole: 'all'
  });

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await api.post('/notifications', formData);
      setIsModalOpen(false);
      setSuccessMsg('Notification broadcasted successfully!');
      
      setFormData({ title: '', message: '', targetRole: 'all' });
      fetchNotifications();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send notification.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this broadcast?')) {
      try {
        await api.delete(`/notifications/${id}`);
        fetchNotifications();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AdminLayout title="Communication Hub">
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-sm flex items-center animate-fade-in-up">
          <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {isAdmin && (
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-sm font-medium">Broadcast alerts and communications directly to active roles.</p>
          <div className="w-48">
            <Button onClick={() => setIsModalOpen(true)}>
              <div className="flex items-center justify-center font-bold">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                New Broadcast
              </div>
            </Button>
          </div>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <span className="block text-4xl mb-4 opacity-50">📭</span>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Active Notifications</h3>
          <p className="text-sm text-gray-500">Your communication inbox is fully cleared.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.map((notif) => (
            <div key={notif._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black border ${
                  notif.targetRole === 'all' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                  notif.targetRole === 'admin' ? 'bg-red-50 border-red-200 text-red-700' :
                  notif.targetRole === 'student' ? 'bg-green-50 border-green-200 text-green-700' :
                  'bg-yellow-50 border-yellow-200 text-yellow-700'
                }`}>
                  @ {notif.targetRole.toUpperCase()}
                </span>
                
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-tight">{notif.title}</h3>
              <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">{notif.message}</p>
              
              {isAdmin && (
                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button 
                    onClick={() => deleteNotification(notif._id)} 
                    className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wide"
                  >
                    Delete Broadcast
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Push Broadcast">
          {error && <div className="mb-5 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <InputField
              label="Broadcast Title"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Campus Route Delay Warning"
              required
            />
            
            <div className="mb-2">
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
                Broadcast Payload (Message)
              </label>
              <textarea
                id="message"
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter detailed information here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-shadow text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience Role</label>
              <select
                required
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white transition-shadow cursor-pointer font-bold text-gray-700 uppercase text-xs"
              >
                <option value="all">ALL GROUPS (Global Broadcast)</option>
                <option value="student">STUDENT APPS ONLY</option>
                <option value="driver">DRIVER TERMINALS ONLY</option>
                <option value="admin">ADMINISTRATION TEAM</option>
              </select>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-red-600 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-red-50 transition shadow-sm">
                Cancel
              </button>
              <div className="flex-1">
                <Button type="submit" isLoading={loading}>Push Alert</Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
};
