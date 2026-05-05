const Project = require('../models/Project');
const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ members: req.user._id })
    .populate('members', 'name email role')
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: projects.length, data: projects });
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description, members = [] } = req.body;
  const uniqueMembers = [...new Set([req.user._id.toString(), ...members])];

  const project = await Project.create({
    name,
    description,
    members: uniqueMembers,
    createdBy: req.user._id
  });

  const populated = await project.populate('members', 'name email role');
  res.status(201).json({ success: true, data: populated });
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, description, members } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  if (!project.members.some((memberId) => memberId.toString() === req.user._id.toString())) {
    const error = new Error('Access denied for this project');
    error.statusCode = 403;
    throw error;
  }

  project.name = name || project.name;
  project.description = description ?? project.description;
  if (members) {
    project.members = [...new Set([project.createdBy.toString(), ...members])];
  }

  await project.save();
  const populated = await project.populate('members', 'name email role');
  res.json({ success: true, data: populated });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  await Task.deleteMany({ projectId: project._id });
  await project.deleteOne();

  res.json({ success: true, message: 'Project and related tasks deleted' });
});

module.exports = { getProjects, createProject, updateProject, deleteProject };
