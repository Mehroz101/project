const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String], // Array of features
      default: [],
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    per_hour: {
      type: Number,
      required: true,
    },
    per_day: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Array of image paths
      default: [],
    },
    state: {
      type: String,
      required: true,
      default: "active",
    },
    totalBooking: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Space = mongoose.model("space", spaceSchema);
module.exports = Space;
// module.exports = mongoose.model("Space", spaceSchema);
