const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewMsg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const review = mongoose.model("Review", ReviewSchema);
module.exports = review;
