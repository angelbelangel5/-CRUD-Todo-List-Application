import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './addtodo.css'; 

const AddTodo = () => {
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    category: '',
    tags: ''
  });

  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h3>Add New Todo</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={todoData.title}
                    onChange={handleChange}
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
                    value={todoData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    className="form-control"
                    value={todoData.status}
                    onChange={handleChange}
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
                    value={todoData.dueDate}
                    onChange={handleChange}
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
                    value={todoData.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags (comma separated):</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="form-control"
                    value={todoData.tags}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Add Todo</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
