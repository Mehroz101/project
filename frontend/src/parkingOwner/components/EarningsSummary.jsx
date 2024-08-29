import React from 'react';
import '../styles/EarningsSummary.css';

const EarningsSummary = () => {
  return (
    <div className="earnings_summary">
      <div className="earnings_card">
        <h3>Withdrawable Balance</h3>
        <div className="amount">
          <span>$345</span>
        </div>
        <button>Withdraw</button>
      </div>
      <div className="earnings_card">
        <h3>Lifetime Earnings</h3>
        <div className="amount">
          <span>$1,234</span>
        </div>
      </div>
      <div className="earnings_card">
        <h3>Last Month’s Earnings</h3>
        <div className="amount">
          <span>$123</span>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;
