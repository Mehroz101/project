import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toggleSpaceStatus } from "../../services/spaceService";
const SpaceRow = ({
  spaceInfo,
  spaceIndex,
  handleToggleStatus,
  handleDeleteSpace,
}) => {
  const [pause, setPause] = useState(false);
  const toggleStatus = async () => {
    try {
      console.log(spaceInfo);
      const spaceId = spaceInfo._id;
      console.log("row: " + spaceId);
      const newState = await toggleSpaceStatus(spaceId);
      if (newState === "Space status updated") {
        setPause(!pause);
      }
      handleToggleStatus(spaceInfo._id, newState); // Notify parent component about the state change
    } catch (error) {
      console.error("Failed to toggle space status:", error);
    }
  };
  const deleteSpace = () => {
    const spaceId = spaceInfo._id;
    console.log("row: " + spaceId);
    handleDeleteSpace(spaceId);
  };
  const REACT_APP_API_URL = "http://localhost:5000/";


  return (
    <>
      <tr>
        <td>
          <span className="id">{spaceIndex}</span>
        </td>
        <td>
          <img
            src={`${REACT_APP_API_URL}${spaceInfo.images[0]}`}
            alt="Product Image"
            className="responsive_img"
            width="50"
          />
        </td>
        <td className="title">{spaceInfo.title}</td>
        <td>
          <span className="badge">{spaceInfo.badge}</span>
        </td>
        <td className="request_id_td">
          <span className="request_id">{spaceInfo._id}</span>
        </td>
        <td className="total_booking">{spaceInfo.totalBooking}</td>
        <td className="price">{spaceInfo.per_hour}</td>
        <td>
          {/* active 
          deactivated
             */}
          <span className={`status ${spaceInfo.state}`}>{spaceInfo.state}</span>
        </td>
        <td className="actions">
          <Link title="view space" to={`view-space/${spaceInfo._id}`}>
            <i className="fa-regular fa-eye"></i>
            <p></p>
          </Link>
          <Link title="edit" to={`/dashboard/edit-space/${spaceInfo._id}`}>
            <i class="fa-solid fa-pen"></i>
          </Link>
          <Link title="pause" onClick={toggleStatus}>
            {pause ? (
              <i class="fa-solid fa-play"></i>
            ) : (
              <i class="fa-solid fa-pause"></i>
            )}
            {/* <i class="fa-solid fa-play"></i> */}
          </Link>
          <Link title="delete" onClick={deleteSpace}>
            <i class="fa-solid fa-trash"></i>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default SpaceRow;
