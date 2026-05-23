const pdfParse = require("pdf-parse");
const fs = require("fs");

exports.extractPDFText = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};