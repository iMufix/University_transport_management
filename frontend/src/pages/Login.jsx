import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card } from '../components/Card';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center p-4">
      <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8 hover:opacity-80 transition">
        Campus<span className="text-gray-400">Transport</span>
      </Link>
      
      <Card className="w-full max-w-sm sm:max-w-md p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
          <p className="text-sm text-gray-500">Enter your details to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@university.edu"
            autoComplete="email"
            required
          />
          
          <div className="focus-within:z-10 group">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition duration-150 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-2">
            <Button type="submit" isLoading={loading}>
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-gray-900 hover:underline transition">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};
