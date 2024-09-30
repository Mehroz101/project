const reservation = require("../models/Reservation");
const space = require("../models/Space");

const createCustomReservation = async (req, res) => {
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
      totalPrice,
    } = req.body;
    console.log(req.body);
    if (
      !spaceId ||
      !name ||
      !email ||
      !phoneNo ||
      !vehicleNo ||
      !arrivalTime ||
      !leaveTime ||
      !arrivalDate ||
      !leaveDate ||
      !totalPrice
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
      totalPrice,
      isCustom: true,
    });
    const response = await createReservation.save();
    // req.io.emit("reservationsUpdated", response);

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
    const spaceIds = await space.find({ userId }).select("_id");
    const response = await reservation
      .find({ userId, spaceId: { $in: spaceIds } })
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
    const response = await reservation
      .findOne({ _id: reservationId, spaceId: { $ne: null } })
      .populate("spaceId");
    // const response = await reservations
    // .find({ userId, spaceId: { $ne: null } })  // Only fetch documents where spaceId is not null
    // .populate("spaceId", "title per_hour per_day")
    // .populate("userId", "fName email");

    if (!response) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
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
      totalPrice,
    } = req.body;
    console.log(req.body);
    if (
      !spaceId ||
      !name ||
      !email ||
      !phoneNo ||
      !vehicleNo ||
      !arrivalTime ||
      !leaveTime ||
      !arrivalDate ||
      !leaveDate ||
      !totalPrice
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
      totalPrice,
      isCustom: false,
    });
    const response = await createReservation.save();
    // req.io.emit("reservationsUpdated", response);

    // console.log(createReservation)
    return res.status(201).json({
      message: "Reservation created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json();
  }
};
const getUserReservation = async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "need to login" });
    }
    const response = await reservation
      .find({ userId, spaceId: { $ne: null }, isCustom: false }) // Only fetch documents where spaceId is not null
      .populate("spaceId", "address images");

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

const getAllReservation = async (req,res) => {
  const userId = req.user.id
  try {
    if (!userId) {
      return res.status(401).json({ message: "need to login" });
    } else {
      const response = await reservation.find();
      if (!response) {
        console.log("error");
        return res.status(404).json();
      }
      return res.status(201).json({response})
    
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createReservation,
  createCustomReservation,
  getReservation,
  cancelReservation,
  confirmReservation,
  getReservationData,
  getUserReservation,
  getAllReservation,
};
