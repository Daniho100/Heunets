import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  name: string;
  description?: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <p className="text-gray-600">
        You do not have any projects right now. Click "Add Project" to create one.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <div
          key={project._id}
          className="border p-4 rounded shadow hover:shadow-lg cursor-pointer transition"
          onClick={() => navigate(`/dashboard/projects/${project._id}`)}
        >
          <h2 className="text-xl font-semibold">{project.name}</h2>
          {project.description && <p className="text-gray-600">{project.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
