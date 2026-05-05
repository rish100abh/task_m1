const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createProjectValidator, updateProjectValidator, projectIdValidator } = require('../validators/projectValidator');

const router = express.Router();

router.use(protect);
router.route('/').get(getProjects).post(authorize('admin'), createProjectValidator, validateRequest, createProject);
router.route('/:id').put(authorize('admin'), updateProjectValidator, validateRequest, updateProject).delete(authorize('admin'), projectIdValidator, validateRequest, deleteProject);

module.exports = router;
