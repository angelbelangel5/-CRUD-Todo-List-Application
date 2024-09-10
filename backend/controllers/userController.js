const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'mysecret';

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = await UserModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userExist = await UserModel.findOne({ email: email });
      if (!userExist) {
        return res.status(404).json({ message: "USER DOESNT EXIST " });
      }
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1d" });
      //  jwt.verify(token, secretKey, { algorithms: ["HS256", "none"] })
      res.json({ token });
    } catch (error) {
      console.error("Login Failed ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  
module.exports = {
  createUser,
  loginUser,

};
