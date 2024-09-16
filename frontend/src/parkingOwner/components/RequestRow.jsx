import React from "react";
import { Link } from "react-router-dom";

const RequestRow = ({
  reservation,
  index,
  handleCancelReservation,
  handleConfirmReservation,
}) => {
  const calculateHours = (reservation) => {
    const arrival = new Date(
      `${reservation.arrivalDate}T${reservation.arrivalTime}`
    );
    const leave = new Date(`${reservation.leaveDate}T${reservation.leaveTime}`);
    const diffInMs = leave - arrival;
    const hours = diffInMs / (1000 * 60 * 60);
    return hours;
  };
  const calculatePrice =(reservation) => {
    const perHourPrice = reservation.spaceId.per_hour;
    const perDayPrice = reservation.spaceId.per_day;
    const hours = calculateHours(reservation);
    console.log(hours)
    if (hours >= 24) {
      // If reservation is for a full day or more
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;

      return days * perDayPrice + remainingHours * perHourPrice;
    } else {
      // If reservation is less than a full day
      return hours * perHourPrice;
    }


  }
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
          $
          {(calculatePrice(reservation)).toFixed(
            2
          )}
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
