import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const navigate = useNavigate();

  return (
    <aside className="h-full flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="font-bold text-xl">My Dashboard</h2>
        <button onClick={closeSidebar} className="md:hidden text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-3">
        <button
          onClick={() => {
            navigate("/dashboard");
            closeSidebar?.();
          }}
          className="text-left px-3 py-2 rounded hover:bg-gray-700 transition"
        >
          Projects
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/home");
            closeSidebar?.();
          }}
          className="text-left px-3 py-2 rounded hover:bg-gray-700 transition"
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/about");
            closeSidebar?.();
          }}
          className="text-left px-3 py-2 rounded hover:bg-gray-700 transition"
        >
          About
        </button>
        <button
          onClick={() => {
            navigate("/dashboard/contact");
            closeSidebar?.();
          }}
          className="text-left px-3 py-2 rounded hover:bg-gray-700 transition"
        >
          Contact
        </button>
      </nav>
    </aside>
  );
}
