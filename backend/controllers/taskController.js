const Task = require('../models/Task');
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

const buildTask = (task) => ({
  ...task.toObject(),
  isOverdue: new Date(task.dueDate) < new Date() && task.status !== 'done'
});

const getTasks = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.projectId) filter.projectId = req.query.projectId;

  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name')
    .sort({ dueDate: 1, createdAt: -1 });

  const visibleTasks = tasks.filter(
    (task) =>
      task.createdBy.toString() === req.user._id.toString() ||
      task.assignedTo?._id?.toString() === req.user._id.toString()
  );

  res.json({ success: true, count: visibleTasks.length, data: visibleTasks.map(buildTask) });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, assignedTo, dueDate, projectId } = req.body;
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  if (!project.members.some((memberId) => memberId.toString() === assignedTo)) {
    const error = new Error('Assigned user must be a project member');
    error.statusCode = 400;
    throw error;
  }

  const task = await Task.create({
    title,
    description,
    status: status || 'todo',
    assignedTo,
    dueDate,
    projectId,
    createdBy: req.user._id
  });

  const populated = await Task.findById(task._id)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name');

  res.status(201).json({ success: true, data: buildTask(populated) });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  const updates = ['title', 'description', 'status', 'assignedTo', 'dueDate'];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) task[field] = req.body[field];
  });

  await task.save();

  const populated = await Task.findById(task._id)
    .populate('assignedTo', 'name email role')
    .populate('projectId', 'name');

  res.json({ success: true, data: buildTask(populated) });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  await task.deleteOne();
  res.json({ success: true, message: 'Task deleted successfully' });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
