
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import SignUp from './components/SignUp'
import Login from './components/Login';
import AddTodo from './components/AddTodo';
import ProtectedRoutes from './utils/ProtectedRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<AddTodo />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
