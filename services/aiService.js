const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
});

exports.generateItinerary = async (bookingData) => {

//   const prompt = `
// Generate a detailed travel itinerary.

// Booking Data:
// ${JSON.stringify(bookingData)}

// Apply the user's changes to the itinerary and return the complete updated itinerary as a valid JSON object matching the same structure as the input. Only return JSON, no explanations.

// Include:
// - Day-wise plan
// - Hotel checkins
// - Flight timings
// - Local recommendations
// - Travel tips
// `;

 const prompt = `
You are a travel planner AI.

minimum 2 days itinerary based on the nearest city in the booking data.

include in the itinerary:
- Nearest food spots
- Local attractions
- Cultural experiences
- Hidden gems
- Local events during the travel dates
- activities
- Local transportation options



Create a structured itinerary based on this travel booking info:
${JSON.stringify(bookingData)}

Return JSON:
// {
//   "tripSummary": "",
//   "dayPlan": [
//     {
//       "day": 1,
//       "plan": ""
//     }
//   ]
// }

// {
//   "location": "",
//   "duration": "",
//   "itinerary": [
//     {
//       "day": "",
//       "date": "",
//       "place": "",
//       "time": "",
//       "activity": "",
//       "description": ""
//     }
//   ]  
// }

{
"title": "",
"city":"",
"start_date": "",
"end_date": "",
"total_days": 0,
"destinations": []
},
"daily_itinerary": [
{
"date": "",
"day": 1,
// "city": "",
"timeline": [
{
"time": "",
"type": "flight | hotel | transport | activity | reminder",
"title": "",
"details": "",
"location": "",
"reference": ""
}
]
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonStr = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

//   return text;
       return JSON.parse(jsonStr);
};