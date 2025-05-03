import React, { useState, useEffect, useRef } from 'react';
import UserList from './components/UserList/UserList'; 
import UserForm from './components/UserForm/UserForm';
import Login from './components/LoginPage/Login';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const formRef = useRef(null); // 👉 Ref for scrolling to the form

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUsers = async () => {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
      };
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddOrUpdateUser = (user) => {
    if (user.id) {
      const updatedUsers = users.map(u => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } else {
      const newUser = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
      setFilteredUsers([...users, newUser]);
    }
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    // 👉 Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app-wrapper">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div className="app-header">
            <div style={{ width: '100px' }} />
            <h1 className="app-title">User Betting</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          <main className="app-main">
            {/* 🔗 Form container with ref */}
            <div className="form-container" ref={formRef}>
              <UserForm user={editingUser} onSubmit={handleAddOrUpdateUser} />
            </div>

            <div className="table-container">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
              </div>
              <UserList users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
