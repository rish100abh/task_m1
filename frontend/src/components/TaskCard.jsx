import clsx from 'clsx';
import { CalendarClock } from 'lucide-react';
import { formatDate, isOverdue } from '../utils/helpers';

const statusClasses = {
  todo: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  done: 'bg-emerald-100 text-emerald-700'
};

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  const overdue = isOverdue(task);

  return (
    <div className={clsx('rounded-2xl border bg-white p-5 shadow-sm', overdue ? 'border-red-300' : 'border-slate-200')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{task.projectId?.name}</p>
        </div>
        <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold capitalize', statusClasses[task.status])}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-600">{task.description || 'No description added.'}</p>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <CalendarClock size={16} />
        <span className={overdue ? 'font-semibold text-red-600' : ''}>
          Due: {formatDate(task.dueDate)} {overdue ? '(Overdue)' : ''}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-500">Assigned to: {task.assignedTo?.name}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {['todo', 'in-progress', 'done'].map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(task._id, status)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Mark {status}
          </button>
        ))}
        <button
          onClick={() => onDelete(task._id)}
          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
