import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import client from '../api/client';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import { isOverdue } from '../utils/helpers';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const query = statusFilter === 'all' ? '' : `?status=${statusFilter}`;
      const { data } = await client.get(`/tasks${query}`);
      setTasks(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter((task) => task.status === 'done').length,
    progress: tasks.filter((task) => task.status === 'in-progress').length,
    overdue: tasks.filter((task) => isOverdue(task)).length
  }), [tasks]);

  const handleDelete = async (taskId) => {
    try {
      await client.delete(`/tasks/${taskId}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await client.put(`/tasks/${taskId}`, { status });
      toast.success('Task updated');
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.total} subtext="Across all assigned projects" />
        <StatCard label="Done" value={stats.done} subtext="Completed tasks" />
        <StatCard label="In Progress" value={stats.progress} subtext="Currently being worked on" />
        <StatCard label="Overdue" value={stats.overdue} subtext="Needs attention today" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {['all', 'todo', 'in-progress', 'done'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${statusFilter === status ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}>
            {status}
          </button>
        ))}
      </div>

      {loading ? <Loader text="Loading dashboard..." /> : (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {tasks.length ? tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange} />
          )) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">No tasks found for this filter.</div>}
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
