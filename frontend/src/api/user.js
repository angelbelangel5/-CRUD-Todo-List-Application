
import axios from 'axios';

const API_URL = 'http://localhost:5000/user'; // base url for the user api

// user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};



//  user registration
export const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { username, email, password });
      return response.data; 
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  