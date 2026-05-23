const itineraryModel = require("../models/itineraryModel");

const getItinerary = async (req, res) => {
    try {
        const id = req.params.id;
        const itinerary = await itineraryModel.findOne({ _id: id, user: req.user.id });
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await itineraryModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getItinerary, getAllItineraries };