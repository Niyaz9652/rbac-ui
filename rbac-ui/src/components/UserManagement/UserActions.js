import React from "react";
import { activateUser, deactivateUser, resetPassword } from "../../services/api";

const UserActions = ({ userId, refresh }) => {
  const handleAction = async (action, successMessage) => {
    try {
      await action(userId);
      if (successMessage) {
        alert(successMessage);
      }
      refresh(); // Trigger refresh after completing the action.
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to complete the action. Please try again.");
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => handleAction(activateUser, "User activated successfully!")}
      >
        Activate
      </button>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        onClick={() => handleAction(deactivateUser, "User deactivated successfully!")}
      >
        Deactivate
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => handleAction(resetPassword, "Password reset successfully!")}
      >
        Reset Password
      </button>
    </div>
  );
};

export default UserActions;
