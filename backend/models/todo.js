const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
  },


  //new features added 
  category: {
    type: String,
  },
  tags: [String],
});

module.exports = mongoose.model('Todo', TodoSchema);


