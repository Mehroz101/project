const Space = require("../models/space");

// Create a new space
const createSpace = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      console.log("User not found");
      return res.status(401).json();
    }

    const userId = user;
    const {
      title,
      short_description,
      description,
      features,
      longitude,
      latitude,
      per_hour,
      per_day,
    } = req.body;

    // Check if required fields are missing
    if (
      !title ||
      !short_description ||
      !description ||
      !longitude ||
      !latitude ||
      !per_hour ||
      !per_day
    ) {
      return res.status(400).json();
    }

    const newSpace = new Space({
      userId,
      title,
      short_description,
      description,
      features: JSON.parse(features),
      longitude,
      latitude,
      per_hour,
      per_day,
      images: req.files.map((file) => file.filename), // Save the file paths
    });

    await newSpace.save();
    return res.status(201).json({ data: newSpace });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json();
  }
};

// Show spaces for a user
const showSpace = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const spaces = await Space.find({ userId: user });
    if (spaces.length === 0) {
      return res.status(404).json();
    }

    return res.status(200).json({ data: spaces });
  } catch (error) {
    // console.error("Error fetching spaces:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const toggleSpaceStatus = async (req, res) => {
  try {
    const { spaceId } = req.body;
    console.log("Space ID:", req);

    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    // Toggle the state
    space.state = space.state === "active" ? "deactivated" : "active";
    await space.save();

    res.status(200).json({ message: "Space status updated", data: space });
  } catch (error) {
    console.error("Error toggling space status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createSpace, showSpace, toggleSpaceStatus };
