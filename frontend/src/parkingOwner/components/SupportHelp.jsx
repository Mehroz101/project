import React from 'react';
import '../styles/SupportHelp.css';

const SupportHelp = () => {
  return (
    <div className="support_help">
      <div className="support_card">
        <h3>Support Tickets</h3>
        <p>No open tickets at the moment.</p>
      </div>
      <div className="support_card">
        <h3>FAQ Section</h3>
        <p>Find answers to common questions here.</p>
      </div>
    </div>
  );
};

export default SupportHelp;
