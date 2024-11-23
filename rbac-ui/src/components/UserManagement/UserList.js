import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../../services/api";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      }
    };

    fetchUserData();
  }, []);

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again.");
    }
  };

  // Render loading or error states
  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => onEdit(user)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(user.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
