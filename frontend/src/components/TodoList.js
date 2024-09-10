import React,{useState,useEffect} from 'react'
import axios from 'axios';


const TodoList = () => {
const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos'); 
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>errorrrr: {error}</p>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <p>Due Date: {todo.dueDate}</p>
            <p>Category: {todo.category}</p>
            <p>Tags: {todo.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList