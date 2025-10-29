import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
}

interface Project {
  _id: string;
  name: string;
  description?: string;
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showEditTask, setShowEditTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [status, setStatus] = useState("pending");

  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/project/${id}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    if (!title) return alert("Task title is required");
    try {
      await API.post("/tasks", {
        title,
        description: desc,
        projectId: id,
      });
      setTitle("");
      setDesc("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = async(task: Task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDesc(task.description || "");
    setStatus(task.status);
    setShowEditTask(true);
  };

  const handleUpdateTask = async () => {
    if (!currentTask) return;
    try {
      await API.patch(`/tasks/${currentTask._id}`, {
        title,
        description: desc,
        status,
      });
      setShowEditTask(false);
      setCurrentTask(null);
      setTitle("");
      setDesc("");
      setStatus("pending");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  if (!project) return <p className="p-6">Loading project...</p>;

  return (
    <div className="flex min-h-screen">

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
        {project.description && <p className="text-gray-600 mb-6">{project.description}</p>}

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Task title"
            className="border p-2 rounded flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task description"
            className="border p-2 rounded flex-1"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {showEditTask ? (
            <select
              className="border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          ) : null}
          <button
            className={`px-4 rounded text-white ${
              showEditTask ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={showEditTask ? handleUpdateTask : handleAddTask}
          >
            {showEditTask ? "Update Task" : "Add Task"}
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-2 border rounded mb-2 flex justify-between items-center"
            >
              <div>
                <span className="font-semibold">{task.title}</span> - {task.description || "No description"}
                <span
                  className={`ml-2 font-semibold ${
                    task.status === "completed" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  [{task.status}]
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {showEditTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
              <input
                type="text"
                placeholder="Task title"
                className="w-full border p-2 rounded mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Task description"
                className="w-full border p-2 rounded mb-3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <select
                className="w-full border p-2 rounded mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowEditTask(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTask}
                  className="px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700"
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
