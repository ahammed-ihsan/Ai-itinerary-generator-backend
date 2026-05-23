const Itinerary = require('../models/itineraryModel');
const { extractPDFText } = require('../services/pdfService');
const { extractImageText } = require('../services/ocrService');
const { extractStructuredData } = require('../services/extractionService');
const { generateItinerary } = require('../services/aiService');

exports.uploadDocuments = async (req, res) => {

  const files = req.files;
  if(!files){
    return res.status(400).json({ message: "No files uploaded" });
  }

  let extractedText = "";

  for (const file of files) {

    if (file.mimetype === "application/pdf") {
      extractedText += await extractPDFText(file.path);
    } else {
      extractedText += await extractImageText(file.path);
    }
  }

  const structuredData = await extractStructuredData(extractedText);

  const itinerary = await generateItinerary(structuredData);

  const saved = await Itinerary.create({
    user: req.user.id,
    itinerary
  });

  res.json(saved);
};