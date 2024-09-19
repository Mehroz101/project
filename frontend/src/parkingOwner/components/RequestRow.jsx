import React from "react";
import { Link } from "react-router-dom";
import { calculatePrice } from "./Functions";

const RequestRow = ({
  reservation,
  index,
  handleCancelReservation,
  handleConfirmReservation,
}) => {

  

  const cancelReservation = () => {
    handleCancelReservation(reservation._id);
  };
  const confirmReservation = () => {
    handleConfirmReservation(reservation._id);
  };
  return (
    <>
      <tr>
        <td>
          <span className="id">{index}</span>
        </td>
        <td className="title">{reservation.spaceId.title}</td>
        <td className="request_id">{reservation._id}</td>
        <td className="user_name">{reservation.name}</td>
        <td className="user_email">{reservation.email}</td>
        <td className="arrival">
          {`${new Date(reservation.arrivalDate).toLocaleDateString()} 
          ${reservation.arrivalTime}`}
        </td>
        <td className="leave">
          {`${new Date(reservation.leaveDate).toLocaleDateString()} 
          ${reservation.leaveTime}`}
        </td>
        <td className="price">
          ${reservation.totalPrice}
        </td>
        <td>
          <span className={`status ${reservation.state}`}>
            {reservation.state}
          </span>
        </td>
        <td className="actions">
          <Link title="view request" to={`view-request/${reservation._id}`}>
            <i className="fa-regular fa-eye"></i>
          </Link>
          {reservation.state === "completed" ? null : (
            // Otherwise, show the confirm and cancel links
            <>
              <Link title="confirm" onClick={confirmReservation}>
                <i className="fa-solid fa-check"></i>
              </Link>
              <Link title="cancel" onClick={cancelReservation}>
                <i className="fa-solid fa-xmark"></i>
              </Link>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
