import { useState, useRef, useEffect } from "react";
import axios from "axios";

const tasksUrl = "http://localhost:4000/tasks";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  // Récupération des tâches au montage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(tasksUrl);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Focus sur l'input quand on édite
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const addTask = async () => {
    const newTask = { title: "Nouvelle tâche", completed: false };
    try {
      const response = await axios.post(tasksUrl, newTask);
      setTasks((prev) => [...prev, response.data]);
      setEditingId(response.data._id);
      setTitle(response.data.title);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${tasksUrl}/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const changeState = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const updatedCompleted = !task.completed;
    try {
      await axios.put(`${tasksUrl}/${id}`, { completed: updatedCompleted });
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, completed: updatedCompleted } : t
        )
      );
    } catch (error) {
      console.error("Error updating task state:", error);
    }
  };

  const handleTitleChange = async (id, newTitle) => {
    try {
      await axios.put(`${tasksUrl}/${id}`, { title: newTitle });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error("Error updating task title:", error);
    }
    setEditingId(null);
    setTitle("");
  };

  return (
    <div>
      <h1>
        @taskbook [ {tasks.filter((t) => t.completed).length} / {tasks.length} ]
        | <button onClick={addTask}>Ajouter</button>
      </h1>

      <ul>
        {tasks.map((task, i) => (
          <li key={task._id}>
            {i + 1}. {task._id}{" "}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => changeState(task._id)}
            />{" "}
            {editingId === task._id ? (
              <input
                ref={inputRef}
                type="text"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitleChange(task._id, title);
                  }
                }}
                onBlur={() => handleTitleChange(task._id, title)}
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setEditingId(task._id);
                  setTitle(task.title);
                }}
              >
                {task.title || <i style={{ color: "#aaa" }}>(sans titre)</i>}
              </span>
            )}{" "}
            | <button onClick={() => deleteTask(task._id)}>x</button>
          </li>
        ))}
      </ul>

      <div>
        <p>
          {(100 * tasks.filter((t) => t.completed).length) / tasks.length}% of
          all tasks complete.
        </p>
        <br />
        <p>
          {tasks.filter((t) => t.completed).length} tâches complétées -{" "}
          {tasks.length} au total.
        </p>
      </div>
    </div>
  );
}

export default ToDoList;
