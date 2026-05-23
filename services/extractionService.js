// exports.extractTravelDataPrompt = (text) => `
// Extract travel booking details from the text.

// Return JSON format:

// {
//   "flights": [],
//   "hotels": [],
//   "trainTickets": [],
//   "dates": [],
//   "destinations": []
// }

// Text:
// ${text}
// `;


// 



const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
});

exports.extractStructuredData = async (rawText) => {
  try {

    const prompt = `
Extract travel booking information from the text below.

Return ONLY valid JSON.

Format:
{
  "flights": [],
  "hotels": [],
  "trainTickets": [],
  "busTickets": [],
  "dates": [],
  "destinations": []
}

Text:
${rawText}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    // Remove markdown if Gemini returns ```json
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    // throw new Error("Failed to extract structured travel data");
  }
};