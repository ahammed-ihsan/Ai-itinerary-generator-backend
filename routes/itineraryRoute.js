const router = require("express").Router();
const { getItinerary, getAllItineraries, createItineraryShareLink, getItineraryByShareId } = require("../controllers/itineraryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get('/:id', authMiddleware, getItinerary);
router.get('/', authMiddleware, getAllItineraries);
router.post('/:id/share', authMiddleware, createItineraryShareLink);
router.get('/share/:shareId', getItineraryByShareId);

module.exports = router;