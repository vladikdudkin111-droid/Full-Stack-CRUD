import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
  });

  const loadTasks = () => {
    fetch("http://localhost:8080/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
    });
    setEditingId(null);
  };

  const saveTask = (event) => {
    event.preventDefault();

    const url = editingId
      ? `http://localhost:8080/api/tasks/${editingId}`
      : "http://localhost:8080/api/tasks";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then(() => {
      loadTasks();
      resetForm();
    });
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => loadTasks());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <h2>{editingId ? "Edit task" : "Add new task"}</h2>

      <form onSubmit={saveTask}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update task" : "Add task"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2>Tasks</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.status} -{" "}
            {task.priority} - {task.dueDate}

            <button
              onClick={() => editTask(task)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;