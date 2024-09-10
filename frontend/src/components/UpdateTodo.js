import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/todos/${id}`);
        setTodo(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status);
        setDueDate(response.data.dueDate);
        setCategory(response.data.category);
        setTags(response.data.tags.join(', '));
      } catch (err) {
        console.error('Error fetching todo:', err);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        title,
        description,
        status,
        dueDate,
        category,
        tags: tags.split(',').map(tag => tag.trim())
      });

      console.log('Todo updated:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Todo</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default UpdateTodo;
