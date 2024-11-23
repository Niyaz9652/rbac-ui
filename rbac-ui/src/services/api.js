import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com"; // Replace with your actual API URL

// Mock Data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
];

const mockRoles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "Viewer", permissions: ["Read"] },
];

const mockPermissions = ["Read", "Write", "Delete"];

// Users API Functions
export const fetchUsers = async (useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => setTimeout(() => resolve({ data: mockUsers }), 500));
  }
  return axios.get(`${API_BASE}/users`);
};

export const addUser = async (user, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      mockUsers.push({ id: mockUsers.length + 1, ...user });
      setTimeout(() => resolve({ data: user }), 500);
    });
  }
  return axios.post(`${API_BASE}/users`, user);
};

export const editUser = async (id, updatedUser, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      const index = mockUsers.findIndex((user) => user.id === id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...updatedUser };
      }
      setTimeout(() => resolve({ data: mockUsers[index] }), 500);
    });
  }
  return axios.put(`${API_BASE}/users/${id}`, updatedUser);
};

export const deleteUser = async (id, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      const index = mockUsers.findIndex((user) => user.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
      setTimeout(() => resolve({ data: { success: true } }), 500);
    });
  }
  return axios.delete(`${API_BASE}/users/${id}`);
};

// Roles API Functions
export const fetchRoles = async (useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => setTimeout(() => resolve({ data: mockRoles }), 500));
  }
  return axios.get(`${API_BASE}/roles`);
};

export const addRole = async (role, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      mockRoles.push({ id: mockRoles.length + 1, ...role });
      setTimeout(() => resolve({ data: role }), 500);
    });
  }
  return axios.post(`${API_BASE}/roles`, role);
};

export const editRole = async (id, updatedRole, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      const index = mockRoles.findIndex((role) => role.id === id);
      if (index !== -1) {
        mockRoles[index] = { ...mockRoles[index], ...updatedRole };
      }
      setTimeout(() => resolve({ data: mockRoles[index] }), 500);
    });
  }
  return axios.put(`${API_BASE}/roles/${id}`, updatedRole);
};

export const deleteRole = async (id, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      const index = mockRoles.findIndex((role) => role.id === id);
      if (index !== -1) {
        mockRoles.splice(index, 1);
      }
      setTimeout(() => resolve({ data: { success: true } }), 500);
    });
  }
  return axios.delete(`${API_BASE}/roles/${id}`);
};

// Permissions API Functions
export const fetchPermissions = async (useMock = true) => {
  if (useMock) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: mockPermissions }), 500)
    );
  }
  return axios.get(`${API_BASE}/permissions`);
};

export const assignPermission = async (roleId, permissions, useMock = true) => {
  if (useMock) {
    return new Promise((resolve) => {
      const role = mockRoles.find((role) => role.id === roleId);
      if (role) {
        role.permissions = permissions;
      }
      setTimeout(() => resolve({ data: role }), 500);
    });
  }
  return axios.post(`${API_BASE}/roles/${roleId}/permissions`, { permissions });
};
