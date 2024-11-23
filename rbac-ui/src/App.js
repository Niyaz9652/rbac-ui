import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import RolePermissions from "./components/RoleManagement/RolePermissions";

const App = () => {
  return (
    <div className="p-4">
      {/* Navigation Menu */}
      <nav className="flex gap-4 mb-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-blue-500 hover:text-blue-700"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-blue-500 hover:text-blue-700"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/roles"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-blue-500 hover:text-blue-700"
          }
        >
          Roles
        </NavLink>
        <NavLink
          to="/permissions"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-bold border-b-2 border-blue-700"
              : "text-blue-500 hover:text-blue-700"
          }
        >
          Permissions
        </NavLink>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route
          path="/permissions"
          element={
            <RolePermissions
              roleId={1} // Replace with dynamic ID as needed
              refresh={() => {
                console.log("Permissions refreshed");
              }}
            />
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
