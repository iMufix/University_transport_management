import { useState, useEffect } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { InputField } from '../components/InputField';
import api from '../services/api';

export const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    busNumber: '',
    capacity: '',
    routeId: '',
    driverId: ''
  });

  const fetchData = async () => {
    try {
      const [busesRes, routesRes] = await Promise.all([
        api.get('/buses'),
        api.get('/routes')
      ]);
      setBuses(busesRes.data);
      setRoutes(routesRes.data);
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
    try {
      const payload = { ...formData };
      if (!payload.routeId) delete payload.routeId;
      if (!payload.driverId) delete payload.driverId;
      
      await api.post('/buses', payload);
      setIsModalOpen(false);
      setFormData({ busNumber: '', capacity: '', routeId: '', driverId: '' });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create bus. Check if Bus Number is unique.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBus = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await api.delete(`/buses/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AdminLayout title="Fleet Management">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500 text-sm font-medium">Manage campus fleet, capacity, and active assignments.</p>
        <div className="w-36">
          <Button onClick={() => setIsModalOpen(true)}>Add Bus</Button>
        </div>
      </div>

      <Table headers={['Bus Number', 'Capacity', 'Assigned Route', 'Driver', 'Actions']}>
        {buses.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-sm">
              No buses found. Add a vehicle into the fleet!
            </td>
          </tr>
        ) : (
          buses.map((bus) => (
            <tr key={bus._id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-b border-gray-50">
                <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md border border-gray-200 font-mono">
                  {bus.busNumber}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-50">
                {bus.capacity} seats
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-50">
                {bus.routeId ? (
                  <span className="font-semibold text-gray-700">{bus.routeId.name}</span>
                ) : (
                  <span className="text-gray-400 italic">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-50">
                {bus.driverId ? (
                  bus.driverId.name
                ) : (
                  <span className="text-gray-400 italic">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-50">
                <button onClick={() => deleteBus(bus._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register a New Bus">
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Bus Number / License Plate"
            id="busNumber"
            value={formData.busNumber}
            onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
            placeholder="e.g. UNV-204"
            required
          />
          
          <InputField
            label="Seating Capacity"
            id="capacity"
            type="number"
            min="1"
            max="150"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="e.g. 50"
            required
          />

          <div className="mb-4">
            <label htmlFor="routeId" className="block text-sm font-bold text-gray-700 mb-1">
              Assign Route (Optional)
            </label>
            <select
              id="routeId"
              value={formData.routeId}
              onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-150 sm:text-sm bg-white cursor-pointer"
            >
              <option value="">Select a route...</option>
              {routes.map(r => (
                <option key={r._id} value={r._id}>{r.name} ({r.stops.length} stops)</option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
              Cancel
            </button>
            <div className="flex-1">
              <Button type="submit" isLoading={loading}>Save Bus</Button>
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
