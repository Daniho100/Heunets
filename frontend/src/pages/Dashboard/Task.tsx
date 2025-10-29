import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const handleCreate = async () => {
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Tasks</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-3 rounded" onClick={handleCreate}>
          Add
        </button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t._id} className="p-2 border rounded mb-2">
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
