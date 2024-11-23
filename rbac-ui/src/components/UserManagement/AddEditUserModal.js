import React, { useState } from "react";
import { addUser, editUser } from "../../services/api";

const AddEditUserModal = ({ user, onClose, refresh }) => {
  // Initialize state with user data or default values
  const [formData, setFormData] = useState(
    user || { name: "", email: "", role: "" }
  );

  const handleSubmit = () => {
    // Determine if this is an edit or add operation
    const action = user ? editUser(user.id, formData) : addUser(formData);

    // Handle the API response
    action
      .then(() => {
        // Refresh data and close the modal on success
        refresh();
        onClose();
      })
      .catch((err) => {
        console.error("Error saving user:", err);
        // Optional: Display error message to the user
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEditUserModal;
