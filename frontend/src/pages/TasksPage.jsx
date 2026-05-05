import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import client from '../api/client';
import Loader from '../components/Loader';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const TasksPage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectRes, taskRes] = await Promise.all([client.get('/projects'), client.get('/tasks')]);
      setProjects(projectRes.data.data);
      setTasks(taskRes.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateTask = async (values) => {
    try {
      setFormLoading(true);
      await client.post('/tasks', values);
      toast.success('Task created');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Task creation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await client.delete(`/tasks/${taskId}`);
      toast.success('Task deleted');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await client.put(`/tasks/${taskId}`, { status });
      toast.success('Task updated');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <TaskForm projects={projects} onSubmit={handleCreateTask} loading={formLoading} />
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
        {loading ? <Loader text="Loading tasks..." /> : (
          <div className="mt-4 grid gap-4">
            {tasks.length ? tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            )) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">No tasks yet. Create one from the left panel.</div>}
          </div>
        )}
      </div>
    </section>
  );
};

export default TasksPage;
