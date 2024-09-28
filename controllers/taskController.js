const Task = require('../models/Task');

const addTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.user._id;

  try {
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      user: userId,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(204).send();
};

module.exports = { addTask, getTasks, updateTask, deleteTask };