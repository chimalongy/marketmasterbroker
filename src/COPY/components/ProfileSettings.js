import React, { useState } from 'react';
import '../styles/ProfileSettings.css';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !email) {
      setError('Please enter your username and email.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Perform authentication and update profile logic here

    // Reset form fields and show success message
    setUsername('');
    setEmail('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPhone('');
    setAddress('');
    setError('');

    alert('Profile settings saved successfully!');
  };

  return (
    <div className="profile-settings">
      <h1>Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="segment">
          <h2>Profile Information</h2>
          <div className="input-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="segment">
          <h2>Change Password</h2>
          <div className="input-field">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="input-field">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="input-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <div className="segment">
          <h2>Contact Information</h2>
          <div className="input-field">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="input-field">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
