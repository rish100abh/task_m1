import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-500">Manage projects, tasks, and team progress.</p>
        <div className="mt-6 grid gap-4">
          <input type="email" placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" className="rounded-xl border border-slate-200 px-4 py-3" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button disabled={loading} className="rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500">No account? <Link to="/register" className="font-semibold text-brand-700">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
