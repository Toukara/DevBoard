import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const tasksUrl = "http://localhost:4000/tasks";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); // Sécurité requêtes
  const inputRef = useRef(null);

  // ---- Progression ----
  const totalTasks = tasks.length;
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  const progressPercentage = useMemo(
    () =>
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
    [completedTasks, totalTasks]
  );

  const tasksBar = useMemo(() => {
    const progressBarLength = 20;
    const completedLength = Math.round(
      (progressPercentage / 100) * progressBarLength
    );
    return `[${"█".repeat(completedLength)}${"░".repeat(
      progressBarLength - completedLength
    )}] `;
  }, [progressPercentage]);

  const getProgressColor = useCallback(
    () => (progressPercentage === 0 ? "#e64040ff" : "#2E8B57"),
    [progressPercentage]
  );

  // ---- API ----
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(tasksUrl);
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.error("Invalid response format:", res.data);
          setTasks([]);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const newTask = { title: "Nouvelle tâche", completed: false };
      const res = await axios.post(tasksUrl, newTask);
      if (res.data && res.data._id) {
        setTasks((prev) => [...prev, res.data]);
        setEditingId(res.data._id);
        setTitle(res.data.title ?? "Nouvelle tâche");
      }
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const deleteTask = useCallback(
    async (id) => {
      if (loading) return;
      try {
        setLoading(true);
        await axios.delete(`${tasksUrl}/${id}`);
        setTasks((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error("Error deleting task:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const toggleTask = useCallback(
    async (id) => {
      if (loading) return;
      const task = tasks.find((t) => t._id === id);
      if (!task) return;

      try {
        setLoading(true);
        const updatedCompleted = !task.completed;
        await axios.put(`${tasksUrl}/${id}`, { completed: updatedCompleted });
        setTasks((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, completed: updatedCompleted } : t
          )
        );
      } catch (err) {
        console.error("Error updating task:", err);
      } finally {
        setLoading(false);
      }
    },
    [tasks, loading]
  );

  const handleTitleChange = useCallback(async (id, newTitle) => {
    const safeTitle = newTitle.trim() || "Sans titre"; // sécurité
    try {
      setLoading(true);
      await axios.put(`${tasksUrl}/${id}`, { title: safeTitle });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, title: safeTitle } : t))
      );
    } catch (err) {
      console.error("Error updating task title:", err);
    } finally {
      setEditingId(null);
      setTitle("");
      setLoading(false);
    }
  }, []);

  // ---- Focus auto sur input ----
  useEffect(() => {
    if (editingId && inputRef.current) inputRef.current.focus();
  }, [editingId]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          paddingBottom: "10px",
        }}
      >
        <p style={{ textDecoration: "underline", textUnderlineOffset: "5px" }}>
          @taskbook
        </p>
        <span style={{ color: "#4d4e4eff" }}>
          [{completedTasks}/{totalTasks}]
        </span>
        |
        <button onClick={addTask} disabled={loading}>
          <p style={{ fontSize: "1.25em", fontWeight: "bold" }}>+</p>
        </button>
      </h1>

      <ul>
        {tasks.length ? (
          tasks.map((task, i) => (
            <li key={task._id} className="task-item">
              <span style={{ color: "#4d4e4eff" }}>{i + 1}.</span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
                disabled={loading}
              />

              {editingId === task._id ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleTitleChange(task._id, title)
                  }
                  onBlur={() => handleTitleChange(task._id, title)}
                  disabled={loading}
                />
              ) : (
                <span
                  onDoubleClick={() => {
                    if (!loading) {
                      setEditingId(task._id);
                      setTitle(task.title);
                    }
                  }}
                >
                  <p
                    id="task-title"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#a3a3a3" : undefined, // Optionnel : grise le texte si complété
                    }}
                  >
                    {task.title}
                  </p>
                </span>
              )}

              <button
                onClick={() => deleteTask(task._id)}
                style={{ color: "#c93131ff", fontSize: "1.25em" }}
                disabled={loading}
              >
                x
              </button>
            </li>
          ))
        ) : (
          <p style={{ color: "rgba(163, 163, 163, 0.88)" }}>
            {loading ? "Chargement..." : "Aucune tâche pour le moment."}
          </p>
        )}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <p>
          <span style={{ color: getProgressColor(), fontWeight: "bold" }}>
            {progressPercentage} %
          </span>{" "}
          of all tasks complete.
        </p>

        <br />

        <p style={{ color: "rgba(163, 163, 163, 0.88)" }}>
          {tasksBar}
          <span style={{ color: getProgressColor(), fontWeight: "bold" }}>
            {completedTasks}
          </span>{" "}
          tâches complétées
        </p>
      </div>
    </div>
  );
}

export default ToDoList;
