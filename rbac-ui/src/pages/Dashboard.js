import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/users"
          className="bg-blue-500 text-white text-center p-6 rounded shadow hover:bg-blue-600"
        >
          Manage Users
        </Link>
        <Link
          to="/roles"
          className="bg-green-500 text-white text-center p-6 rounded shadow hover:bg-green-600"
        >
          Manage Roles
        </Link>
        <Link
          to="/permissions"
          className="bg-yellow-500 text-white text-center p-6 rounded shadow hover:bg-yellow-600"
        >
          Manage Permissions
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
