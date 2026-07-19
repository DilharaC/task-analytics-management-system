import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Settings, LogOut, CheckSquare, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'Tasks', icon: ListTodo },
  ];

  const isActive = (path: string) => location.pathname === path;

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-[#12151C]/60 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-[#12151C] text-white flex flex-col z-50
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md border border-white/10 flex items-center justify-center flex-shrink-0">
              <CheckSquare size={16} className="text-[#5B8DEF]" />
            </div>
            <div>
              <p className="font-mono font-semibold text-[13px] tracking-wide leading-tight">ZENTRYX</p>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-[0.12em] leading-tight mt-0.5">Task Manager</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#8B94A3] hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-0.5 mt-2 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(path) ? 'text-white bg-white/[0.05]' : 'text-[#8B94A3] hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {isActive(path) && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[#5B8DEF]" />}
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-3">
          <Link
            to="/settings"
            onClick={onClose}
            className={`relative flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/settings') ? 'text-white bg-white/[0.05]' : 'text-[#8B94A3] hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Settings size={17} />
            Settings
          </Link>
        </div>

        <div className="mx-3 border-t border-white/10" />

        <div className="px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-sm font-medium text-[#8B94A3] hover:text-white hover:bg-white/[0.03] w-full transition-colors"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}