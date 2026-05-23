require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const cors = require('cors');

app.use(cors());

connectDB();

app.use(express.json());

const authRoutes = require('./routes/authRoute');
const uploadRoutes = require('./routes/uploadRoute');
const itineraryRoutes = require('./routes/itineraryRoute');
const errorMiddleware = require('./middleware/errorMiddleware');


app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/itinerary', itineraryRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});