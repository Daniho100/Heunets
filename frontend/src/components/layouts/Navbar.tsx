import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/logo.png.webp'

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-600">
        <img src={logo} alt="logo" width={150} height={100}/>
      </Link>

      <div className="flex space-x-6">
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

      <div className="flex items-center space-x-4">
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
    </nav>
  );
}
