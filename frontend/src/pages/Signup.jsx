import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card } from '../components/Card';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import api from '../services/api';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await api.post('/auth/register', formData);
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center py-12 px-4">
      <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8 hover:opacity-80 transition">
        Campus<span className="text-gray-400">Transport</span>
      </Link>
      
      <Card className="w-full max-w-sm sm:max-w-md p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Create account</h2>
          <p className="text-sm text-gray-500">Sign up to get started instantly</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Alex Doe"
            required
            autoComplete="name"
          />
          
          <InputField
            label="Email address"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@university.edu"
            required
            autoComplete="email"
          />
          
          <div className="mb-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-150 sm:text-sm bg-white cursor-pointer"
            >
              <option value="student">Student</option>
              <option value="driver">Driver</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <InputField
            label="Password"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            minLength={6}
          />

          <div className="pt-2">
            <Button type="submit" isLoading={loading}>
              Create account
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-gray-900 hover:underline transition">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};
