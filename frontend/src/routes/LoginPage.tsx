import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import loginImage from '../assets/login-image.jpg';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex w-full max-w-4xl min-h-[620px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left: form */}
        <div className="flex flex-1 items-center justify-center p-8 md:p-14 order-2 md:order-1">
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-5">
            <div>
              <h1 className="text-[26px] text-gray-900" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                Log in
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">
                No account?{' '}
                <Link to="/register" className="font-medium" style={{ color: '#0F1729' }}>
                  Register
                </Link>
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                  Email
                </label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block text-[11px] font-medium tracking-[0.1em] uppercase text-gray-500 mb-1.5">
                  Password
                </label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#0F1729' }}
              className="text-white hover:opacity-90"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </div>

        {/* Right: image panel — clean, minimal overlay */}
        <div className="hidden md:block md:w-[50%] relative overflow-hidden order-1 md:order-2">
          <img
            src={loginImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* faint bottom scrim only, just enough to seat the wordmark */}
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(180deg, rgba(15,23,41,0) 20%, rgba(15,23,41,0.35) 100%)' }}
          />

          <div className="absolute top-8 left-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#34D399' }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white">
              Flowline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}