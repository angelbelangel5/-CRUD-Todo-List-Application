const Todo = require('../models/todo');

// this will create  a new todo
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
    });
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get all data in todo
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get a single todo by id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// upddate a todo by id
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a todo by id
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
