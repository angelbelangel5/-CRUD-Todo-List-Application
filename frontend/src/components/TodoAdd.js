import React from 'react'

function TodoAdd() {
const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  return (
    <form onSubmit={handleSubmit}>
    <h2>Add New Todo</h2>
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
    <button type="submit">Add Todo</button>
  </form>
  )
}

export default TodoAdd