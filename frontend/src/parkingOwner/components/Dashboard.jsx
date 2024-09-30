import React, { useEffect, useState } from "react";
import OverviewStats from "../components/OverviewStats";
import RecentActivities from "../components/RecentActivities";
import Statistics from "../components/Statistics";
import EarningsSummary from "../components/EarningsSummary";
import NotificationsAlerts from "../components/NotificationsAlerts";
import UserFeedbackReviews from "../components/UserFeedbackReviews";
import SettingsAccountManagement from "../components/SettingsAccountManagement";
import SupportHelp from "../components/SupportHelp";
import { useParkingOwner } from "../../context/ReservationContext";

const Dashboard = () => {
  const { reservation, space } = useParkingOwner();
  const [reservations, setReservations] = useState([]);
  const [spaces, setSpaces] = useState([]);


  const assignResponse = () => {
    if (reservation) {
      setReservations(reservation);
    }
    if (space) {
      setSpaces(space);
    }
  };
  useEffect(() => {
    assignResponse();
  }, [space, reservation]);

  return (
    <>
      <OverviewStats space={spaces} reservation={reservations} />
      <RecentActivities />
      <Statistics  space={spaces} reservation={reservations}/>
      {/* <EarningsSummary /> */}
      {/* <NotificationsAlerts /> */}
      <UserFeedbackReviews />
      {/* <SettingsAccountManagement /> */}
      <SupportHelp />
    </>
  );
};

export default Dashboard;
