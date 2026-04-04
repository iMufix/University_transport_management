import { useState, useEffect } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { InputField } from '../components/InputField';
import api from '../services/api';

export const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    pickupPoint: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterBus, setFilterBus] = useState('');

  const fetchData = async () => {
    try {
      const [studentsRes, busesRes, routesRes] = await Promise.all([
        api.get('/students'),
        api.get('/buses'),
        api.get('/routes')
      ]);
      setStudents(studentsRes.data);
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
    setSuccessMsg('');
    try {
      const { data } = await api.post('/students', formData);
      setIsModalOpen(false);
      setSuccessMsg(`Student successfully allocated to Bus!`);
      setFormData({ name: '', email: '', department: '', pickupPoint: '' });
      fetchData();
      
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create and allocate student.');
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      try {
        await api.delete(`/students/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const allStops = Array.from(new Set(routes.flatMap(r => r.stops.map(s => s.stopName)))).sort();
  const allDepts = Array.from(new Set(students.map(s => s.department))).sort();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept ? student.department === filterDept : true;
    const matchesBus = filterBus ? (student.busId && student.busId._id === filterBus) : true;
    return matchesSearch && matchesDept && matchesBus;
  });

  return (
    <AdminLayout title="Student Allocations">
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-sm flex items-center animate-fade-in-up">
          <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Search Students</label>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-900 outline-none text-sm transition-shadow"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Filter Department</label>
            <select 
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-900 outline-none text-sm bg-white transition-shadow"
            >
              <option value="">All Departments</option>
              {allDepts.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Filter Bus</label>
            <select 
              value={filterBus}
              onChange={(e) => setFilterBus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-900 outline-none text-sm bg-white transition-shadow"
            >
              <option value="">All Buses</option>
              {buses.map(bus => {
                const assignedCount = students.filter(s => s.busId?._id === bus._id).length;
                return (
                  <option key={bus._id} value={bus._id}>
                    Bus {bus.busNumber} ({assignedCount}/{bus.capacity} full)
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="w-full md:w-40">
          <Button onClick={() => setIsModalOpen(true)}>Allocate Student</Button>
        </div>
      </div>

      <Table headers={['Student Info', 'Department', 'Pickup Point', 'Assigned Bus', 'Actions']}>
        {filteredStudents.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 text-sm">
              <span className="block text-2xl mb-2">📭</span>
              No students found matching your criteria.
            </td>
          </tr>
        ) : (
          filteredStudents.map((student) => (
            <tr key={student._id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-xs uppercase shadow-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium border-b border-gray-50">
                {student.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-gray-50">
                {student.pickupPoint}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-50">
                {student.busId ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                    Bus {student.busId.busNumber}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                    Unassigned
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-50">
                <button onClick={() => deleteStudent(student._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Smart Bus Allocation">
        {error && <div className="mb-5 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. John Doe"
              required
            />
            <InputField
              label="Email Address"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. john@university.edu"
              required
            />
          </div>

          <InputField
            label="Department"
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="e.g. Computer Science"
            required
          />

          <div className="mb-2">
            <label htmlFor="pickupPoint" className="block text-sm font-bold text-gray-700 mb-1">
              Select Pickup Point
            </label>
            <select
              id="pickupPoint"
              required
              value={formData.pickupPoint}
              onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-150 sm:text-sm bg-white cursor-pointer"
            >
              <option value="" disabled>Choose a predefined route node...</option>
              {allStops.map(stop => (
                <option key={stop} value={stop}>{stop}</option>
              ))}
            </select>
            <p className="mt-2 text-xs text-gray-500 font-medium tracking-wide">The system algorithm will compute capacity and match the closest bus automatically.</p>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm">
              Cancel
            </button>
            <div className="flex-1">
              <Button type="submit" isLoading={loading}>Allocate Automatically</Button>
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
