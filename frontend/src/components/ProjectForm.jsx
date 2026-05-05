import { useEffect, useState } from 'react';

const ProjectForm = ({ users, onSubmit, loading }) => {
  const [form, setForm] = useState({ name: '', description: '', members: [] });

  useEffect(() => {
    if (!users.length) setForm((prev) => ({ ...prev, members: [] }));
  }, [users]);

  const handleMemberToggle = (userId) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter((id) => id !== userId)
        : [...prev.members, userId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', description: '', members: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Create Project</h2>
      <div className="mt-4 grid gap-4">
        <input className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" rows="3" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Members</p>
          <div className="grid gap-2 md:grid-cols-2">
            {users.map((user) => (
              <label key={user._id} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
                <input type="checkbox" checked={form.members.includes(user._id)} onChange={() => handleMemberToggle(user._id)} />
                <span>{user.name} ({user.role})</span>
              </label>
            ))}
          </div>
        </div>
        <button disabled={loading} className="rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
