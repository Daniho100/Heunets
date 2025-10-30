import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardHome from "../pages/Dashboard/Dashboard";
import ProjectDetails from "../pages/Dashboard/ProjectDetails";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

export default function AppRouter() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
      </Route>
    </Routes>
    <Footer />
    </>
  );
}
