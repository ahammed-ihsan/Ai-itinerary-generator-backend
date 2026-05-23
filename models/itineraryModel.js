const mongoose = require('mongoose');
const ItinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  sourceUpload: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Upload"
  },
  itinerary: Object,
  shareId: String,
  isPublic: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Itinerary", ItinerarySchema);