import { useEffect, useState } from "react";
import API from "../../api/axios";
import ProjectList from "./Project";

interface Project {
  _id: string;
  name: string;
  description?: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async () => {
    if (!newTitle) return alert("Project title is required");
    try {
      await API.post("/projects", { name: newTitle, description: newDesc });
      setNewTitle("");
      setNewDesc("");
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">My Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
        >
          Add Project
        </button>
      </div>

      <ProjectList projects={projects} onRefresh={fetchProjects} />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              className="w-full border p-2 rounded mb-3"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Project Description (optional)"
              className="w-full border p-2 rounded mb-3"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
