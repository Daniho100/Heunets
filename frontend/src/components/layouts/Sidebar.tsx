import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="p-6 font-bold text-2xl">My Dashboard</div>
      <nav className="flex-1 flex flex-col gap-2 p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-left px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Projects
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
