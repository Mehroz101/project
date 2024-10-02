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
// Helper function to calculate the distance between two points (latitude, longitude) using the Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
  // Filter locations within 5 km
  export const getNearbySpaces = (userLat, userLong) => {
    return spaces.filter((space) => {
      const distance = calculateDistance(
        userLat,
        userLong,
        space.latitude,
        space.longitude
      );
      return distance <= 5; // Only show spaces within 5 km
    });
  };