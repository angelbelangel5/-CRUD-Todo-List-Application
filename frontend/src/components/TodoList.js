import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos found</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;