import { Link, Navigate } from 'react-router-dom';
import { CheckSquare, ArrowRight, ListChecks, BarChart3, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import dashboardScreenshot from '../assets/dashboard.png';
import tasksScreenshot from '../assets/tasks.png';
import mobileScreenshot from '../assets/mobile-dashboard.png';



const FONT_SERIF = "'Newsreader', Georgia, serif";
const FONT_SANS = "'IBM Plex Sans', system-ui, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, monospace";

function VerifiedStamp() {
  return (
    <div
      className="absolute left-0 top-0 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 -rotate-[13deg] sm:h-32 sm:w-32"
      aria-hidden="true"
    >
      <div className="relative flex h-full w-full items-center justify-center rounded-full border-[2.5px] border-[#B45309]/80 bg-[#FAFAF9]">
        <div className="absolute inset-[7px] rounded-full border border-dashed border-[#B45309]/45" />
        <div className="flex flex-col items-center gap-1.5">
          <span
            className="text-[9px] font-semibold uppercase leading-none tracking-[0.18em] text-[#B45309]/85 sm:text-[10px]"
            style={{ fontFamily: FONT_MONO }}
          >
            Verified
          </span>
          <span
            className="text-sm leading-none text-[#B45309]/90 sm:text-base"
            style={{ fontFamily: FONT_SERIF, fontStyle: 'italic' }}
          >
            N&deg; 1,248
          </span>
        </div>
      </div>
    </div>
  );
}

function DeviceMockup() {
  return (
    <div
      className="relative w-full max-w-lg pl-6 pt-8 sm:pl-7 sm:pt-10"
      style={{ paddingBottom: '13%' }}
    >
      <VerifiedStamp />

      {/* ===== Laptop ===== */}
      <div className="relative">
        <div className="relative rounded-t-2xl rounded-b-[6px] bg-[#16233D] p-3.5 pb-5 shadow-[0_40px_80px_-20px_rgba(22,35,61,0.45),0_10px_20px_-10px_rgba(22,35,61,0.3)]">
          <span className="absolute left-1/2 top-1.5 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#0A1220] ring-1 ring-white/5" />
          <div className="aspect-[16/10] overflow-hidden rounded-[4px] bg-[#0A1220]">
            <img
              src={dashboardScreenshot}
              alt="Zentryx dashboard showing active tasks, completed today, overdue, and status/priority charts"
              className="block h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div className="mx-[-2px] h-2 rounded-b-[3px] bg-gradient-to-b from-[#C3C8D1] to-[#AEB4C0]" />
        <div className="relative h-4 rounded-b-[10px] bg-gradient-to-b from-[#E7E9EE] to-[#C9CDD6] shadow-[0_6px_14px_-4px_rgba(22,35,61,0.25)]">
          <span className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-[#B7BCC6]" />
        </div>
      </div>

      {/* ===== Tablet ===== */}
      <div className="absolute z-[2] w-[44%] rotate-3" style={{ right: '-6.5%', bottom: '-8.75%' }}>
        <div className="relative rounded-[20px] bg-[#16233D] p-2.5 pb-4 shadow-[0_30px_60px_-18px_rgba(22,35,61,0.5),0_6px_16px_-6px_rgba(22,35,61,0.4)]">
          <span className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0A1220]" />
          <div className="aspect-[16/11] overflow-hidden rounded-lg bg-[#0A1220]">
            <img
              src={tasksScreenshot}
              alt="Zentryx tasks list with status, priority, and due dates"
              className="block h-full w-full object-cover object-left-top"
            />
          </div>
          <span className="mx-auto mt-2 block h-1 w-[34%] rounded-full bg-white/30" />
        </div>
      </div>

      {/* ===== Phone ===== */}
      <div className="absolute z-[3] w-[23%] -rotate-6" style={{ left: '-4.7%', bottom: '-10.9%' }}>
        <div className="relative rounded-[26px] bg-[#16233D] p-2 shadow-[0_26px_50px_-14px_rgba(22,35,61,0.55),0_6px_14px_-6px_rgba(22,35,61,0.45)]">
          <span className="absolute -right-[2px] top-[26%] h-8 w-[3px] rounded-l bg-[#0F1A2E]" />
          <span className="absolute -left-[2px] top-[20%] h-4 w-[3px] rounded-r bg-[#0F1A2E]" />
          <span className="absolute -left-[2px] top-[30%] h-6 w-[3px] rounded-r bg-[#0F1A2E]" />
          <div className="relative aspect-[423/901] overflow-hidden rounded-[18px] bg-[#0A1220]">
            <span className="absolute left-1/2 top-2 z-[4] h-3 w-[34%] -translate-x-1/2 rounded-lg bg-[#0A1220]" />
            <img
              src={mobileScreenshot}
              alt="Zentryx dashboard on mobile"
              className="block h-full w-full object-cover object-top"
            />
            <span className="absolute bottom-1.5 left-1/2 z-[4] h-[3px] w-[30%] -translate-x-1/2 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAF9]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1E3A5F]" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      no: '01',
      code: 'TASKS',
      icon: ListChecks,
      accent: '#1E3A5F',
      title: 'Task management',
      desc: 'Create tasks, set due dates and priority, and move them through your own status flow.',
    },
    {
      no: '02',
      code: 'CHARTS',
      icon: BarChart3,
      accent: '#15803D',
      title: 'Analytics dashboard',
      desc: 'Status and priority breakdowns update automatically as you work — no dashboards to build.',
    },
    {
      no: '03',
      code: 'AUTH',
      icon: ShieldCheck,
      accent: '#16233D',
      title: 'Secure by default',
      desc: 'Every session is authenticated and every route is protected, without extra configuration.',
    },
  ];

  const capabilities = ['Due dates & priority', 'Status history', 'Weekly digest', 'CSV export'];

  return (
    <div className="min-h-screen bg-[#FAFAF9]" style={{ fontFamily: FONT_SANS }}>
      <header className="border-b border-[#D9DCE3]/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 sm:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#D9DCE3] bg-white">
              <CheckSquare size={16} className="text-[#1E3A5F]" />
            </div>
            <p
              className="text-[13px] font-semibold tracking-wide text-[#16233D]"
              style={{ fontFamily: FONT_MONO }}
            >
              ZENTRYX
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-md px-4 py-2 text-sm font-medium text-[#16233D] transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]/40"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-[#1E3A5F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#16283F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]/40"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative overflow-hidden px-6 pb-28 pt-14 sm:px-10 sm:pt-20">
        {/* Ruled-paper background — ledger lines, not a generic dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, #D9DCE3 31px, #D9DCE3 32px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 92%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 92%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-[76px] hidden w-px bg-[#D9DCE3] sm:block lg:left-[120px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 92%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 92%)',
          }}
        />

        <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col items-start gap-6 text-left">
            <span
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wider text-[#1E3A5F]"
              style={{ fontFamily: FONT_MONO }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B45309]/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B45309]" />
              </span>
              ENTRY N&deg; 1,248 — LIVE LEDGER
            </span>
            <h1
              className="max-w-lg text-4xl font-semibold leading-[1.1] tracking-tight text-[#16233D] sm:text-5xl"
              style={{ fontFamily: FONT_SERIF }}
            >
              Every task, <span className="italic">logged.</span>
              <br />
              Every pattern, <span className="italic">visible.</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-[#5B6472] sm:text-base">
              Zentryx keeps a running record of everything you finish, then reads it back
              to you as clear analytics — no dashboards to configure, no reports to build.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-md bg-[#1E3A5F] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_24px_-8px_rgba(30,58,95,0.55)] transition-all hover:-translate-y-0.5 hover:bg-[#16283F] hover:shadow-[0_14px_28px_-8px_rgba(30,58,95,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]/40"
              >
                Start your ledger
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-[11px] text-[#5B6472]" style={{ fontFamily: FONT_MONO }}>
                No credit card · No setup
              </span>
            </div>
          </div>

          <div className="flex justify-center pb-10 lg:justify-end lg:pb-4">
            <DeviceMockup />
          </div>
        </div>
      </main>

      {/* Capability ledger row */}
      <div className="border-y border-[#D9DCE3] bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-0 gap-y-3 px-6 py-5 sm:px-10">
          {capabilities.map((item, i) => (
            <span key={item} className="flex items-center">
              {i > 0 && <span className="mx-5 hidden h-3 w-px self-center bg-[#D9DCE3] sm:block" />}
              <span
                className="flex items-baseline text-[11px] tracking-wide text-[#5B6472]"
                style={{ fontFamily: FONT_MONO }}
              >
                <span className="text-[#5B6472]/50">{String(i + 1).padStart(2, '0')}&nbsp;·&nbsp;</span>
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-16 sm:grid-cols-3 sm:px-10">
        {features.map(({ no, code, icon: Icon, accent, title, desc }) => (
          <div
            key={code}
            className="group relative rounded-md border border-[#D9DCE3] bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(22,35,61,0.25)]"
            style={{ borderTopColor: accent, borderTopWidth: '2px' }}
          >
            <span
              className="absolute right-4 top-4 text-[10px] tracking-wide text-[#5B6472]/70"
              style={{ fontFamily: FONT_MONO }}
            >
              ENTRY {no} / {code}
            </span>
            <div
              className="mb-4 flex h-9 w-9 items-center justify-center rounded-md"
              style={{ backgroundColor: `${accent}14` }}
            >
              <Icon size={17} style={{ color: accent }} />
            </div>
            <p className="mb-1.5 text-base font-medium text-[#16233D]" style={{ fontFamily: FONT_SERIF }}>
              {title}
            </p>
            <p className="text-xs leading-relaxed text-[#5B6472]">{desc}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-[#D9DCE3]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:px-10 sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-[#D9DCE3] bg-white">
              <CheckSquare size={12} className="text-[#1E3A5F]" />
            </div>
            <p className="text-[11px] tracking-wide text-[#5B6472]" style={{ fontFamily: FONT_MONO }}>
              ZENTRYX — a running record of your work
            </p>
          </div>
          <p className="text-[11px] text-[#5B6472]/70" style={{ fontFamily: FONT_MONO }}>
            &copy; {new Date().getFullYear()} C Dilhara
          </p>
        </div>
      </footer>
    </div>
  );
}