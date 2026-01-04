 import React, { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard.svelte";
import { getTasks, deleteTask } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => { loadTasks(); }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;
