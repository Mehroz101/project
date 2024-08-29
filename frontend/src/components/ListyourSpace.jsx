import React from "react";
import "../styles/ListYourSpace.css";
import { Link } from "react-router-dom";
const ListyourSpace = () => {
  return (
    <>
      <div className="listyouownspace_page">
        <h1>Go to Dashboard</h1>
        <div className="dashboard_navigator">
          <p>click on the button to navigate to dashboard</p>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ListyourSpace;
