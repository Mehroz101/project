const reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
  console.log(req.user.id);
  console.log(req.body);
  try {
    const user = req.user.id;
    if (!user) {
      console.log("User not found");
      return res.status(401).json();
    }
    const userId = req.user.id;
    const {
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
    } = req.body;
    if (
      !spaceId ||
      !name ||
      !email ||
      !phoneNo ||
      !vehicleNo ||
      !arrivalTime ||
      !leaveTime ||
      !arrivalDate ||
      !leaveDate
    ) {
      return res.status(400).json();
    }
    const createReservation = new reservation({
      userId,
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
    });
    await createReservation.save();
    // console.log(createReservation)
    return res.status(201).json({
      message: "Reservation created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json();
  }
};
const getReservation = async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "need to login" });
    }
    const response = await reservation
      .find({ userId })
      .populate("spaceId", "title per_hour per_day")
      .populate("userId", "fName email");
    if (!response) {
      console.log("error");
      return res.status(404).json();
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(500).json();
  }
};
const cancelReservation = async (req, res) => {
  try {
    // Extract reservationId from req.body
    const { reservartionId } = req.body;
    console.log("reservationId");
    console.log(reservartionId);

    // Check if reservationId is provided
    if (!reservartionId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    // Find reservation by ID
    const getreservation = await reservation.findById(reservartionId); // Use the correct model name
    // Check if reservation exists
    if (!getreservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update reservation state
    getreservation.state = "cancelled";

    // Save the updated reservation
    await getreservation.save();

    return res
      .status(200)
      .json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while cancelling the reservation" });
  }
};
const confirmReservation = async (req, res) => {
  try {
    // Extract reservationId from req.body
    const { reservartionId } = req.body;
    console.log("reservationId");
    console.log(reservartionId);

    // Check if reservationId is provided
    if (!reservartionId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    // Find reservation by ID
    const getreservation = await reservation.findById(reservartionId); // Use the correct model name
    // Check if reservation exists
    if (!getreservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update reservation state
    // if (getreservation.state === "pending")
    getreservation.state = "confirmed";

    // Save the updated reservation
    await getreservation.save();

    return res
      .status(200)
      .json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while cancelling the reservation" });
  }
};
const getReservationData = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const response = await reservation.findById(reservationId).populate("spaceId");
    if(!response){
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createReservation,
  getReservation,
  cancelReservation,
  confirmReservation,
  getReservationData,
};
