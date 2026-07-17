import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
        <p className="text-sm text-gray-600 text-center">
          No account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}