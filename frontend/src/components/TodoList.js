import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './todolist.css'; 

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
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col">
          <h2></h2>
          <button className="btn btn-primary" onClick={() => navigate('/add')}>Add New Todo</button>
        </div>
      </div>
      {editTodo ? (
        <div className="card mb-3">
          <div className="card-header bg-primary text-white">
            <h3>Edit Todo</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-control"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={editFormData.status}
                  onChange={handleEditChange}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date:</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-control"
                  value={editFormData.dueDate}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="form-control"
                  value={editFormData.category}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated):</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="form-control"
                  value={editFormData.tags}
                  onChange={handleEditChange}
                />
              </div>
              <button type="submit" className="btn btn-success">Update Todo</button>
              <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditTodo(null)}>Cancel</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="list-group">
          {todos.map((todo) => (
            <div key={todo._id} className="list-group-item mb-3">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p><strong>Status:</strong> {todo.status}</p>
              <p><strong>Due Date:</strong> {new Date(todo.dueDate).toLocaleDateString()}</p>
              <p><strong>Category:</strong> {todo.category}</p>
              <p><strong>Tags:</strong> {todo.tags.join(', ')}</p>
              <button className="btn btn-warning mr-2" onClick={() => handleEditClick(todo)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
