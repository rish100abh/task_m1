export const isOverdue = (task) => new Date(task.dueDate) < new Date() && task.status !== 'done';
export const formatDate = (date) => new Date(date).toLocaleDateString();
