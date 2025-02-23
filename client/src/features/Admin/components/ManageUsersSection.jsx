import { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";
import { useUser } from "../../../context/UserContext";
import "./ManageUsersSection.scss";
import { deleteUser, updateUser } from "../../../service/api";
import EditModal from "./EditModal";

const ManageUsersSection = () => {
  const { user: currentUser } = useUser();
  const { users: initialUsers, loading, error } = useUsers();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-users-section">
      <h2>Manage Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.id !== currentUser.id)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => setSelectedUser(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedUser && (
        <EditModal
          title="Edit User"
          data={selectedUser}
          fields={[
            { name: "username", label: "Name" },
            { name: "email", label: "Email" },
            { name: "role", label: "Role" },
          ]}
          onSave={handleSave}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default ManageUsersSection;