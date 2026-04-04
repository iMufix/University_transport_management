import { useState, useEffect } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { InputField } from '../components/InputField';
import api from '../services/api';

export const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    stops: [{ stopName: '', order: 1 }],
    timings: [{ departureTime: '', shift: '' }]
  });

  const fetchRoutes = async () => {
    try {
      const { data } = await api.get('/routes');
      setRoutes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleAddStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, { stopName: '', order: formData.stops.length + 1 }]
    });
  };

  const handleStopChange = (index, value) => {
    const newStops = [...formData.stops];
    newStops[index].stopName = value;
    setFormData({ ...formData, stops: newStops });
  };

  const removeStop = (index) => {
    const newStops = formData.stops.filter((_, i) => i !== index).map((stop, i) => ({ ...stop, order: i + 1 }));
    setFormData({ ...formData, stops: newStops });
  };

  const handleAddTiming = () => {
    setFormData({
      ...formData,
      timings: [...formData.timings, { departureTime: '', shift: '' }]
    });
  };

  const handleTimingChange = (index, field, value) => {
    const newTimings = [...formData.timings];
    newTimings[index][field] = value;
    setFormData({ ...formData, timings: newTimings });
  };

  const removeTiming = (index) => {
    const newTimings = formData.timings.filter((_, i) => i !== index);
    setFormData({ ...formData, timings: newTimings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/routes', formData);
      setIsModalOpen(false);
      setFormData({ name: '', stops: [{ stopName: '', order: 1 }], timings: [{ departureTime: '', shift: '' }] });
      fetchRoutes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create route');
    } finally {
      setLoading(false);
    }
  };

  const deleteRoute = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await api.delete(`/routes/${id}`);
        fetchRoutes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AdminLayout title="Route Management">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500 text-sm font-medium">Manage campus transport routes and stops.</p>
        <div className="w-36">
          <Button onClick={() => setIsModalOpen(true)}>Add Route</Button>
        </div>
      </div>

      <Table headers={['Route Name', 'Stops Count', 'Timings', 'Actions']}>
        {routes.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-10 text-center text-gray-500 text-sm">
              No routes found. Create your first route!
            </td>
          </tr>
        ) : (
          routes.map((route) => (
            <tr key={route._id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-b border-gray-50">
                {route.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 border-b border-gray-50">
                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-semibold">
                  {route.stops.length} stops
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 border-b border-gray-50">
                {route.timings.map(t => t.departureTime).join(' • ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-50">
                <button onClick={() => deleteRoute(route._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Route">
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Route Name"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. North Campus Express"
            required
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Stops Sequence</label>
              <button type="button" onClick={handleAddStop} className="text-xs text-blue-600 font-bold hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-md transition-colors shadow-sm">
                + Add Stop
              </button>
            </div>
            <div className="space-y-2 border border-gray-200 p-4 rounded-xl bg-white shadow-sm max-h-48 overflow-y-auto">
              {formData.stops.map((stop, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-xs font-bold text-gray-400 w-4">{index + 1}.</span>
                  <input
                    type="text"
                    required
                    placeholder="Stop Name"
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900 outline-none text-sm transition-shadow"
                    value={stop.stopName}
                    onChange={(e) => handleStopChange(index, e.target.value)}
                  />
                  {formData.stops.length > 1 && (
                    <button type="button" onClick={() => removeStop(index)} className="text-gray-400 hover:text-red-500 px-1 hover:bg-red-50 rounded h-7 w-7 flex items-center justify-center transition-colors">
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Departure Timings</label>
              <button type="button" onClick={handleAddTiming} className="text-xs text-blue-600 font-bold hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-md transition-colors shadow-sm">
                + Add Timing
              </button>
            </div>
            <div className="space-y-2 border border-gray-200 p-4 rounded-xl bg-white shadow-sm max-h-48 overflow-y-auto">
              {formData.timings.map((timing, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="time"
                    required
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900 outline-none text-sm transition-shadow"
                    value={timing.departureTime}
                    onChange={(e) => handleTimingChange(index, 'departureTime', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Shift (optional)"
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-900 outline-none text-sm transition-shadow"
                    value={timing.shift}
                    onChange={(e) => handleTimingChange(index, 'shift', e.target.value)}
                  />
                  {formData.timings.length > 1 && (
                    <button type="button" onClick={() => removeTiming(index)} className="text-gray-400 hover:text-red-500 px-1 hover:bg-red-50 rounded h-7 w-7 flex items-center justify-center transition-colors">
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
              Cancel
            </button>
            <div className="flex-1">
              <Button type="submit" isLoading={loading}>Save Route</Button>
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
