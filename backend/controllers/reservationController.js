const reservation = require("../models/Reservation");
const review = require("../models/Review");
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
    const io = req.app.get("io");

    // Emit an event to notify clients about the space status change
    io.emit("reservationUpdated", {
      message: "reservation created",
    });
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
      .find({ spaceId: { $in: spaceIds } })
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
    const io = req.app.get("io");

    // Emit an event to notify clients about the space status change
    io.emit("reservationUpdated", {
      message: "reservation canceled",
    });
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
    const io = req.app.get("io");

    // Emit an event to notify clients about the space status change
    io.emit("reservationUpdated", {
      message: "reservation confirmed",
    });
    return res
      .status(200)
      .json({ message: "Reservation confirmed successfully" });
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
  // console.log(req.user.id);
  // console.log(req.body);
  try {
    const userId = req.user.id;
    if (!userId) {
      console.log("User not found");
      return res.status(401).json();
    }
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
    const isSpace = await space.findOne({ _id: spaceId }); // Match _id with spaceId from frontend

    if (isSpace) {
      if (isSpace.state !== "active") {
        return res.status(404).json();
      }
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
    const io = req.app.get("io");

    // Emit an event to notify clients about the space status change
    io.emit("reservationUpdated", {
      message: "reservation created by user",
    });
    return res.status(201).json({
      message: "Reservation created successfully",
      response,
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
      .find({ userId, spaceId: { $ne: null }, isCustom: false })
      .populate("spaceId", "address images")
      .populate("reviewId", "rating");

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

const getAllReservation = async (req, res) => {
  // const userId = req.user.id;
  try {
    // if (!userId) {
    //   return res.status(401).json({ message: "need to login" });
    // } else {
    const response = await reservation.find();
    if (!response) {
      console.log("error");
      return res.status(404).json();
    }
    return res.status(201).json({ response });
  } catch (error) {
    // }
    console.log(error.message);
  }
};
const reservedReservation = async (req, res) => {
  const { reservationId } = req.body; // Expecting the new state in the request body
  try {
    // Find the reservation by ID
    const isReservation = await reservation.findById(reservationId);
    console.log("reservationId");

    if (!isReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update the reservation state
    isReservation.state = "reserved";

    // Save the updated reservation
    await isReservation.save();
    const io = req.app.get("io");

    // Emit a socket event to notify clients of the update (if using Socket.io)
    io.emit("reservationUpdated", {
      message: "Reservation status updated",
      isReservation: isReservation,
    });

    return res.status(200).json({
      message: "Reservation status updated successfully",
      isReservation,
    });
  } catch (error) {
    console.error("Error updating reservation status:", error.message);
    return res
      .status(500)
      .json({ message: "Error updating reservation status", error });
  }
};

const getSpaceSpecificReservations = async (req, res) => {
  const { spaceId } = req.params;
  console.log("response");
  console.log(spaceId);
  try {
    const response = await reservation.find({ spaceId: spaceId });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.messgae);
  }
};
const postReview = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json();
    }
    const { rating, msg, reservationId, spaceId } = req.body;
    console.log(req.body);
    const isSpace = await space.findById(spaceId);
    if (isSpace) {
      const isReservation = await reservation.findById(reservationId);
      if (isReservation) {
        if (isReservation.reviewId === null) {
          const Review = new review({
            userId: userId,
            spaceId: spaceId,
            reservationId: reservationId,
            rating: rating,
            reviewMsg: msg,
          });
          const response = await Review.save();
          await reservation.findByIdAndUpdate(reservationId, {
            reviewId: Review._id,
          });
          //calculate average review  
          const reviews = await review.find({spaceId:spaceId});
          let total = 0;
          for(let i = 0; i < reviews.length; i++){
            total += reviews[i].rating;
          }
          const avg = total / reviews.length;

          await space.findByIdAndUpdate(spaceId, {
            averageRating: avg
            });

          
          const io = req.app.get("io");
          io.emit("reviewUpdate", {
            message: "Review is given",
            spaceId: spaceId,
            reservationId: reservationId,
          });
          return res.status(200).json({
            message: "Review Submitted successfully",
            response,
          });
        } else {
          res.status(403).json({
            message: "Review already submitted",
          });
        }
      } else {
        res.status(404).json({ message: "Reservation found error" });
      }
    } else {
      res.status(404).json({ message: "Space found error or been deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(501).json();
  }
};
//
module.exports = {
  createReservation,
  createCustomReservation,
  getReservation,
  cancelReservation,
  confirmReservation,
  getReservationData,
  getUserReservation,
  getAllReservation,
  reservedReservation,
  getSpaceSpecificReservations,
  postReview,
};
