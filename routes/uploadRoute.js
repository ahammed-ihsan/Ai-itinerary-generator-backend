const router = require('express').Router();
const { upload } = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const {uploadDocuments} = require('../controllers/uploadController')

router.post(
  "/",
  authMiddleware,
  upload.array("files", 10),
  uploadDocuments
);

module.exports = router;