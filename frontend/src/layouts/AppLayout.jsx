import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FolderKanban, LayoutDashboard, LogOut, SquareCheckBig } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: SquareCheckBig }
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-r border-slate-200 bg-white p-6">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white">TM</div>
          Team Task Manager
        </Link>

        <nav className="mt-8 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 font-medium ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="p-4 md:p-8">
        <header className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-sm capitalize text-brand-700">Role: {user?.role}</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            <LogOut size={16} />
            Logout
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
