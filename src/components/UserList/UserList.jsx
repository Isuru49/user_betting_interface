import React from 'react';
import './UserList.css';

function UserList({ users, onEdit, onDelete }) {


  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.maidenName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
