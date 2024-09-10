import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    category: '',
    tags: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 
    const tagsArray = todoData.tags.split(',').map(tag => tag.trim());

    try {
      const response = await axios.post('http://localhost:5000/todo', {
        ...todoData,
        tags: tagsArray
      });
      console.log('Todo added:', response.data);
     
      setTodoData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
        category: '',
        tags: ''
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <h2>Add New Todo</h2>
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
            value={todoData.dueDate}
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
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
