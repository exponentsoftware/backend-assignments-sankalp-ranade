const express = require('express');
const router = express.Router();
const { getAllTasks, getTaskById, addTask, deleteTaskById } = require('../controllers/taskController');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', addTask)
router.delete("/tasks/:id", deleteTaskById);

module.exports = router;
