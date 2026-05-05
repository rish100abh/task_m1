import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import client from '../api/client';
import ProjectForm from '../components/ProjectForm';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, usersRes] = await Promise.all([client.get('/projects'), client.get('/users')]);
      setProjects(projectsRes.data.data);
      setUsers(usersRes.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateProject = async (values) => {
    try {
      setFormLoading(true);
      await client.post('/projects', values);
      toast.success('Project created');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Project creation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await client.delete(`/projects/${projectId}`);
      toast.success('Project deleted');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
      {user?.role === 'admin' ? <ProjectForm users={users} onSubmit={handleCreateProject} loading={formLoading} /> : <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">Only admins can create projects.</div>}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
        {loading ? <Loader text="Loading projects..." /> : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <div key={project._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">{project.description || 'No description provided.'}</p>
                  </div>
                  {user?.role === 'admin' && <button onClick={() => handleDelete(project._id)} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">Delete</button>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.members.map((member) => (
                    <span key={member._id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{member.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
