import React, { useState, useEffect } from "react";
import { fetchPermissions, assignPermission } from "../../services/api";

const RolePermissions = ({ roleId, refresh }) => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPermissions()
      .then((response) => {
        setPermissions(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching permissions:", err);
        setError("Failed to fetch permissions. Please try again.");
        setLoading(false);
      });
  }, []);

  const handlePermissionToggle = (permission) => {
    const updatedPermissions = selectedPermissions.includes(permission)
      ? selectedPermissions.filter((p) => p !== permission)
      : [...selectedPermissions, permission];
    setSelectedPermissions(updatedPermissions);
  };

  const handleSave = () => {
    setLoading(true);
    assignPermission(roleId, selectedPermissions)
      .then(() => {
        refresh();
        alert("Permissions updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating permissions:", error);
        setError("Failed to update permissions. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Permissions</h2>
      <div className="flex flex-wrap gap-2">
        {permissions.map((permission) => (
          <label key={permission} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedPermissions.includes(permission)}
              onChange={() => handlePermissionToggle(permission)}
            />
            {permission}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Permissions"}
      </button>
    </div>
  );
};

export default RolePermissions;
