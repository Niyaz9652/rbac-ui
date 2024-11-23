import React, { useState, useEffect } from "react";
import { fetchRoles, deleteUser } from "../../services/api";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const RoleList = ({ onEdit }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Role Management</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Role Name</th>
            <th className="border px-4 py-2">Permissions</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length === 0 ? (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">
                No roles found.
              </td>
            </tr>
          ) : (
            roles.map((role) => (
              <tr key={role.id}>
                <td className="border px-4 py-2">{role.name}</td>
                <td className="border px-4 py-2">
                  {role.permissions.join(", ")}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => onEdit(role)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(role.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
