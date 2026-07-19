import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import loginImage from '../assets/login-image.jpg';

// ---------------------------------------------------------------------------
// Mirrors LoginPage.tsx — same design system, image panel flipped to the
// left so the pair feels like two entries in the same ledger, not two
// unrelated screens. "Start your ledger" callback matches the landing CTA.
// ---------------------------------------------------------------------------

const FONT_SERIF = "'Newsreader', Georgia, serif";
const FONT_SANS = "'IBM Plex Sans', system-ui, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, monospace";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-[#FAFAF9] p-4"
      style={{ fontFamily: FONT_SANS }}
    >
      <Link
        to="/"
        aria-label="Close and return to home"
        className="absolute right-6 top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#D9DCE3] bg-white text-[#5B6472] transition-colors hover:bg-[#F1F0EC] hover:text-[#16233D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]/40"
      >
        <X size={16} />
      </Link>

      <div className="flex min-h-[660px] w-full max-w-4xl overflow-hidden rounded-md border border-[#D9DCE3] bg-white shadow-[0_30px_60px_-24px_rgba(22,35,61,0.25)]">
        {/* Left: image panel */}
        <div className="relative hidden overflow-hidden md:block md:w-[46%]">
          <img src={loginImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-x-0 bottom-0 h-28"
            style={{ background: 'linear-gradient(180deg, rgba(22,35,61,0) 20%, rgba(22,35,61,0.45) 100%)' }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(200deg, rgba(22,35,61,0.12) 0%, rgba(22,35,61,0) 45%)' }}
          />

          <div className="absolute left-8 top-8 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B45309]/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B45309]" />
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: FONT_MONO }}
            >
              Zentryx
            </span>
          </div>

          <div className="absolute bottom-6 left-8 right-8">
            <p
              className="text-xs uppercase tracking-[0.14em] text-white/70"
              style={{ fontFamily: FONT_MONO }}
            >
              No credit card · No setup
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="relative flex flex-1 items-center justify-center p-8 md:p-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, #D9DCE3 31px, #D9DCE3 32px)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)',
              opacity: 0.6,
            }}
          />

          <form onSubmit={handleSubmit} className="relative flex w-full max-w-sm flex-col gap-6">
            <div>
              <span
                className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium tracking-wider text-[#1E3A5F]"
                style={{ fontFamily: FONT_MONO }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#B45309]" />
                ENTRY N&deg; 1,250 — NEW RECORD
              </span>
              <h1
                className="text-[30px] leading-none text-[#16233D]"
                style={{ fontFamily: FONT_SERIF, fontWeight: 500 }}
              >
                Start your <span className="italic">ledger.</span>
              </h1>
              <p className="mt-2 text-sm text-[#5B6472]">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#1E3A5F] hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            {error && (
              <p className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label
                  className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-[#5B6472]"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-[#5B6472]"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Email
                </label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-[#5B6472]"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#1E3A5F' }}
              className="rounded-md !bg-[#1E3A5F] text-white shadow-[0_10px_24px_-8px_rgba(30,58,95,0.55)] transition-all hover:-translate-y-0.5 hover:!bg-[#16283F] hover:shadow-[0_14px_28px_-8px_rgba(30,58,95,0.6)]"
            >
              {loading ? 'Creating account…' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}