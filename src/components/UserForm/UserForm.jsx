import React, { useState, useEffect } from 'react';
import './UserForm.css';

function UserForm({ user, onSubmit }) {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [maidenName, setMaidenName] = useState(user?.maidenName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [age, setAge] = useState(user?.age || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setMaidenName(user.maidenName);
      setLastName(user.lastName);
      setAge(user.age);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, firstName, maidenName, lastName, age, email };
    onSubmit(updatedUser);
    setFirstName('');
    setMaidenName('');
    setLastName('');
    setAge('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{user ? 'Update User' : 'Add New User'}</h2>

      <div className="form-group">
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Middle Name" value={maidenName} onChange={(e) => setMaidenName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

      <div className="form-group">
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <button type="submit" className="submit-btn">
        {user ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
}

export default UserForm;
