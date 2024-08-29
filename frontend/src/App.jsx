import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import "./styles/HomePage.css";
import "./styles/Basic.css";
import Login from "./pages/Login";
import MainApp from "./pages/MainApp";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import ListyourSpace from "./components/ListyourSpace";
import ParkingOwnerDashboard from "./parkingOwner/pages/ParkingOwnerDashboard";
import ReservationRequest from "./parkingOwner/components/ReservationRequest";
import ManageSpace from "./parkingOwner/components/ManageSpace";
import CreateRequest from "./parkingOwner/components/CreateRequest";
import CreateSpace from "./parkingOwner/components/CreateSpace";
import AccountInformation from "./components/AccountInformation";
import ReservationHistory from "./components/ReservationHistory";
import Earning from "./parkingOwner/components/Earning";
import MessagesContainer from "./components/MessagesContainer";
import Dashboard from "./parkingOwner/components/Dashboard";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import ForgetPass from "./pages/ForgetPass";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgetpassword" element={<ForgetPass />} />
      <Route path="/searchResult" element={<MainApp />} />
      <Route path="/aboutus" element={<AboutUs />} />

      <Route path="/profile" element={<Profile />}>
        <Route index element={<AccountInformation />} />
        <Route path="booking" element={<ReservationHistory />} />
        <Route path="listyourspace" element={<ListyourSpace />} />
        <Route path="message" element={<MessagesContainer />} />
      </Route>

      <Route path="/reservation" element={<Reservation />} />
      <Route path="/listyourspace" element={<ListyourSpace />} />

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<ParkingOwnerDashboard />}>
        <Route index element={<Dashboard />} /> {/* Default Dashboard Container */}
        <Route path="reservation-request" element={<ReservationRequest />} />
        <Route path="reservation-request/create-request" element={<CreateRequest />} />
        <Route path="earning" element={<Earning />} />
        <Route path="manage-space" element={<ManageSpace />} />
        <Route path="manage-space/create-space" element={<CreateSpace />} />
      </Route>
    </Routes>
  );
}

export default App;
