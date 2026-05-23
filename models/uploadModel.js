const mongoose = require('mongoose');
const UploadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  files: [String],
  extractedText: String,
  extractedData: Object
}, { timestamps: true });

module.exports = mongoose.model("Upload", UploadSchema);