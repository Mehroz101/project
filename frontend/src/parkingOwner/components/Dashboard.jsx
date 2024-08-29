import React from "react";
import OverviewStats from "../components/OverviewStats";
import RecentActivities from "../components/RecentActivities";
import Statistics from "../components/Statistics";
import EarningsSummary from "../components/EarningsSummary";
import NotificationsAlerts from "../components/NotificationsAlerts";
import UserFeedbackReviews from "../components/UserFeedbackReviews";
import SettingsAccountManagement from "../components/SettingsAccountManagement";
import SupportHelp from "../components/SupportHelp";
const Dashboard = () => {
  return (
    <>
      <OverviewStats />
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
