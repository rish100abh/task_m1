const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createTaskValidator, updateTaskValidator, taskIdValidator } = require('../validators/taskValidator');

const router = express.Router();

router.use(protect);
router.route('/').get(getTasks).post(createTaskValidator, validateRequest, createTask);
router.route('/:id').put(updateTaskValidator, validateRequest, updateTask).delete(taskIdValidator, validateRequest, deleteTask);

module.exports = router;
