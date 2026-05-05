import { useMemo, useState } from 'react';

const TaskForm = ({ projects, onSubmit, loading }) => {
  const [form, setForm] = useState({ title: '', description: '', status: 'todo', assignedTo: '', dueDate: '', projectId: '' });

  const selectedProject = useMemo(
    () => projects.find((project) => project._id === form.projectId),
    [projects, form.projectId]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', status: 'todo', assignedTo: '', dueDate: '', projectId: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Create Task</h2>
      <div className="mt-4 grid gap-4">
        <input className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" rows="3" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value, assignedTo: '' })}>
          <option value="">Select project</option>
          {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
        </select>
        <select className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
          <option value="">Assign member</option>
          {selectedProject?.members?.map((member) => <option key={member._id} value={member._id}>{member.name}</option>)}
        </select>
        <input type="date" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <button disabled={loading} className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
          {loading ? 'Saving...' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
