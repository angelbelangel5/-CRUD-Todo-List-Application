import React, { useState } from 'react';
import axios from 'axios';

const EditTodo = ({ todo, setEditingTodo, setTodos }) => {
  const [todoData, setTodoData] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status,
    dueDate: todo.dueDate,
    category: todo.category,
    tags: todo.tags.join(', '),
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert tags from comma-separated string to array
    const tagsArray = todoData.tags.split(',').map(tag => tag.trim());

    try {
      const response = await axios.put(`http://localhost:5000/todo/${todo._id}`, {
        ...todoData,
        tags: tagsArray,
      });
      console.log('Todo updated:', response.data);

      // Update the todos list after editing
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === todo._id ? response.data : t))
      );
      
      // Clear editing state
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Edit Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={todoData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={todoData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={todoData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={new Date(todoData.dueDate).toISOString().split('T')[0]} // format date
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={todoData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            name="tags"
            value={todoData.tags}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Todo</button>
        <button type="button" onClick={() => setEditingTodo(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
