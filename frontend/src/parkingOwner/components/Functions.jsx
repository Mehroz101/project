export const calculatePrice = (hour, price_perhour, price_perday) => {
  const perHourPrice = price_perhour;
  const perDayPrice = price_perday;
  const hours = hour;
  if (hours >= 24) {
    // If reservation is for a full day or more
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    return (days * perDayPrice + remainingHours * perHourPrice).toFixed(2);
  } else {
    // If reservation is less than a full day
    return (hours * perHourPrice).toFixed(2);
  }
};
export const calculateHours = (
  arrivalTime,
  arrivalDate,
  leaveTime,
  leaveDate
) => {
  const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
  const leave = new Date(`${leaveDate}T${leaveTime}`);
  const diffInMs = leave - arrival;
  const hours = diffInMs / (1000 * 60 * 60);
  return hours;
};
export const totalBooking = (type, space, reservations) => {

  const totalCount = reservations
    ?.filter((reservation) => reservation.spaceId === space._id)
    .filter((reservation) => reservation.state === type).length;
  return totalCount;
};
