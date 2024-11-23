import React, { useState } from "react";
import { addUser, editUser } from "../../services/api";

const AddEditRoleModal = ({ role, onClose, refresh }) => {
  const [formData, setFormData] = useState(
    role || { name: "", permissions: [] }
  );

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      console.error("Role name is required.");
      return;
    }

    const action = role ? editUser(role.id, formData) : addUser(formData);
    action
      .then(() => {
        refresh();
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((p) => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold mb-4">
          {role ? "Edit Role" : "Add Role"}
        </h2>
        <div className="mb-4">
          <label>Role Name:</label>
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
          <label>Permissions:</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Read", "Write", "Delete"].map((permission) => (
              <label key={permission} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                {permission}
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
    </div>
  );
};

export default AddEditRoleModal;
