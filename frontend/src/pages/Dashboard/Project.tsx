import type{ FC } from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

interface Project {
  _id: string;
  name: string;
  description?: string;
}

interface ProjectListProps {
  projects: Project[];
  onRefresh?: () => void; 
}

const ProjectList: FC<ProjectListProps> = ({ projects, onRefresh }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setName(project.name);
    setDesc(project.description || "");
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!currentProject) return;
    try {
      await API.patch(`/projects/${currentProject._id}`, { name, description: desc });
      setShowEditModal(false);
      setCurrentProject(null);
      onRefresh?.(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${projectId}`);
      onRefresh?.();
    } catch (err) {
      console.error(err);
    }
  };

  if (projects.length === 0) {
    return (
      <p className="text-gray-600">
        You do not have any projects right now. Click “Add Project” to create one.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project._id}
          className="border p-4 rounded shadow hover:shadow-lg transition bg-white flex flex-col justify-between"
        >
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/dashboard/projects/${project._id}`)}
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            {project.description && (
              <p className="text-gray-600 mt-1">{project.description}</p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              onClick={() => handleEditClick(project)}
            >
              Edit
            </button>
            <button
              className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              onClick={() => handleDelete(project._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

     
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
            <input
              type="text"
              placeholder="Project name"
              className="w-full border p-2 rounded mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Project description"
              className="w-full border p-2 rounded mb-3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
