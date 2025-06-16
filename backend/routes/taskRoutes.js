const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyJWT = require('../middlewares/verifyJWT');

// CREATE
router.post('/', verifyJWT, async (req, res) => {

  try {
    const task = new Task({
      ...req.body,
      userEmail: req.tokenEmail, // store the email of logged-in user
    });
    const result = await task.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (all)
router.get('/', verifyJWT, async (req, res) => {
  try {
    const tasks = await Task.find({ userEmail: req.tokenEmail });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// UPDATE
router.put('/:id', verifyJWT, async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Check ownership
    if (task.userEmail !== req.tokenEmail) {
      return res.status(403).json({ message: 'Access denied: Not your task' });
    }

    // Update task
    const updated = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE
router.delete('/:id', verifyJWT, async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.userEmail !== req.tokenEmail) {
      return res.status(403).json({ message: 'Access denied: Not your task' });
    }

    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
