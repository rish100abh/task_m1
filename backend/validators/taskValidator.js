const { body, param } = require('express-validator');

const createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('description').optional().isString(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
  body('assignedTo').isMongoId().withMessage('Assigned user is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('projectId').isMongoId().withMessage('Valid project id is required')
];

const updateTaskValidator = [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title').optional().trim().notEmpty().withMessage('Task title cannot be empty'),
  body('description').optional().isString(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
  body('assignedTo').optional().isMongoId().withMessage('Assigned user must be valid'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be valid')
];

const taskIdValidator = [param('id').isMongoId().withMessage('Invalid task id')];

module.exports = { createTaskValidator, updateTaskValidator, taskIdValidator };
