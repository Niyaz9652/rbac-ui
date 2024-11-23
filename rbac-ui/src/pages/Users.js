import React, { useState } from "react";
import UserList from "../components/UserManagement/UserList";
import AddEditUserModal from "../components/UserManagement/AddEditUserModal";

const Users = () => {
  // State for managing the modal and the selected user
  const [modalUser, setModalUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refreshes the user list and closes the modal
  const refreshUsers = () => {
    setModalUser(null);
    setIsModalOpen(false);
  };

  // Opens the modal with the selected user for editing
  const handleEditUser = (user) => {
    setModalUser(user);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* User List with edit functionality */}
      <UserList onEdit={handleEditUser} />

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <AddEditUserModal
          user={modalUser}
          onClose={() => setIsModalOpen(false)}
          refresh={refreshUsers}
        />
      )}
    </div>
  );
};

export default Users;
