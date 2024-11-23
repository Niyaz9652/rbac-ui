import React, { useState } from "react";
import RoleList from "../components/RoleManagement/RoleList";
import AddEditRoleModal from "../components/RoleManagement/AddEditRoleModal";

const Roles = () => {
  const [modalRole, setModalRole] = useState(null); // For managing the selected role
  const [isModalOpen, setIsModalOpen] = useState(false); // For managing modal visibility

  // Close the modal and reset the role state
  const refreshRoles = () => {
    setModalRole(null);
    setIsModalOpen(false);
  };

  // Handle opening the modal with a specific role
  const handleEditRole = (role) => {
    setModalRole(role);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Role List Component */}
      <RoleList onEdit={handleEditRole} />

      {/* Add/Edit Role Modal */}
      {isModalOpen && (
        <AddEditRoleModal
          role={modalRole}
          onClose={() => setIsModalOpen(false)}
          refresh={refreshRoles}
        />
      )}
    </div>
  );
};

export default Roles;
