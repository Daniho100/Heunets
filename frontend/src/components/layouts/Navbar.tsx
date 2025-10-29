import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X } from "lucide-react"; 
import logo from "../../assets/logo.png.webp";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="logo" width={130} height={80} />
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/dashboard/home"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard/about"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            About
          </Link>
          <Link
            to="/dashboard/contact"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <Link
              to="/dashboard/home"
              className="text-gray-700 hover:text-green-600 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard/about"
              className="text-gray-700 hover:text-green-600 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/dashboard/contact"
              className="text-gray-700 hover:text-green-600 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-3 flex flex-col space-y-2">
            {user ? (
              <>
                <span className="text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
