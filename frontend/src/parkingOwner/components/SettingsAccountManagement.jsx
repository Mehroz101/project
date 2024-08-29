import React from 'react';
import '../styles/SettingsAccountManagement.css';

const SettingsAccountManagement = () => {
  return (
    <div className="settings_account_management">
      <div className="settings_card">
        <h3>Profile Management</h3>
        <button>Update Profile</button>
      </div>
      <div className="settings_card">
        <h3>Slot Pricing</h3>
        <button>Manage Pricing</button>
      </div>
    </div>
  );
};

export default SettingsAccountManagement;
