import React, { useEffect, useState } from "react";
import OverviewStats from "../components/OverviewStats";
import RecentActivities from "../components/RecentActivities";
import Statistics from "../components/Statistics";
import EarningsSummary from "../components/EarningsSummary";
import NotificationsAlerts from "../components/NotificationsAlerts";
import UserFeedbackReviews from "../components/UserFeedbackReviews";
import SettingsAccountManagement from "../components/SettingsAccountManagement";
import SupportHelp from "../components/SupportHelp";
const Dashboard = () => {
  // const [slots,setSlots] = useState()
  // const [reservation,setReservation] = useState()

  // const getDetail = async () => {
  //   try {
  //     const [reservationsResponse, spacesResponse] = await Promise.all([
  //       getReservation(),
  //       getSpace(),
  //     ]);
  //     // console.log(reservationsResponse)
  //     setSlots(spacesResponse.data.data)
  //     setReservation(reservationsResponse)
  //     // console.log(spacesResponse)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };
  //
  // useEffect(() => {
  //   getDetail();
  // }, []);
  // useEffect(()=>{
  //   if(slots){
  //     console.log("slots")
  //   }
  // },[])
  return (
    <>
      <OverviewStats  />
      <RecentActivities />
      <Statistics />
      {/* <EarningsSummary /> */}
      {/* <NotificationsAlerts /> */}
      <UserFeedbackReviews />
      {/* <SettingsAccountManagement /> */}
      <SupportHelp />
    </>
  );
};

export default Dashboard;
