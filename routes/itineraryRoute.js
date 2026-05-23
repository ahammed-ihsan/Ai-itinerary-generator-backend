const router = require("express").Router();
const { getItinerary, getAllItineraries } = require("../controllers/itineraryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/:id', authMiddleware, getItinerary);
router.get('/', authMiddleware, getAllItineraries);

module.exports = router;