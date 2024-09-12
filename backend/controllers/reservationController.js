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
      message: "Reservation created successfully",});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json();
  }
};
const getReservation = async (req, res) => {};
module.exports = {
  createReservation,
};
