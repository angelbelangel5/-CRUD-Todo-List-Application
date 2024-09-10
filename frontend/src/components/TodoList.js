import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    category: '',
    tags: ''
  });
  const navigate = useNavigate();

  // Fetch todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todo');
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo._id);
    setEditFormData({
      title: todo.title,
      description: todo.description,
      status: todo.status,
      dueDate: todo.dueDate,
      category: todo.category,
      tags: todo.tags.join(', ')
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/todo/${editTodo}`, editFormData);
      setTodos(todos.map(todo => (todo._id === editTodo ? response.data : todo)));
      setEditTodo(null);
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <h2>To do </h2>
      <button onClick={() => navigate('/add')}>Add New Todo</button> 

      {editTodo ? (
        <div>
          <h3>Edit Todo</h3>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={editFormData.status}
                onChange={handleEditChange}
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
                value={editFormData.dueDate}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={editFormData.category}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Tags (comma separated):</label>
              <input
                type="text"
                name="tags"
                value={editFormData.tags}
                onChange={handleEditChange}
              />
            </div>
            <button type="submit">Update Todo</button>
            <button type="button" onClick={() => setEditTodo(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Status: {todo.status}</p>
              <p>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</p>
              <p>Category: {todo.category}</p>
              <p>Tags: {todo.tags.join(', ')}</p>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
