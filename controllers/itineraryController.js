const itineraryModel = require("../models/itineraryModel");
const { nanoid } = require("nanoid");

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

const createItineraryShareLink = async (req, res) => {
    try {
        const id = req.params.id;
        const itinerary = await itineraryModel.findOne({ _id: id, user: req.user.id });
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        const shareId = nanoid(10);

        itinerary.shareId = shareId;
        itinerary.isPublic = true;

        await itinerary.save();
        
        res.json({ shareLink: `https://ai-itinerary-generator-frontend-ihw.vercel.app/shared/${itinerary.shareId}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItineraryByShareId = async (req, res) => {
    try {
        const shareId = req.params.shareId;
        const itinerary = await itineraryModel.findOne({ shareId, isPublic: true });
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getItinerary, getAllItineraries, createItineraryShareLink, getItineraryByShareId };