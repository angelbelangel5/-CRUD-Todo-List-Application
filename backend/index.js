const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});