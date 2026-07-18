import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from './AppLayout';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();
  const { setSidebarOpen } = useSidebar();
  const initial = user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-white border-b border-[#E2E4E9]">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden w-9 h-9 flex-shrink-0 rounded-md border border-[#E2E4E9] hover:bg-[#F5F6F8] flex items-center justify-center"
        >
          <Menu size={18} className="text-[#12151C]" />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-[#12151C] tracking-tight truncate">{title}</h1>
          <p className="text-xs sm:text-sm text-[#6B7280] truncate mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button className="relative w-9 h-9 rounded-md border border-[#E2E4E9] hover:bg-[#F5F6F8] flex items-center justify-center">
          <Bell size={16} className="text-[#6B7280]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#B5482E]" />
        </button>
        <div className="w-9 h-9 rounded-md border border-[#E2E4E9] bg-white flex items-center justify-center font-mono text-xs font-semibold text-[#12151C] flex-shrink-0">
          {initial}
        </div>
      </div>
    </header>
  );
}