import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"

import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js"
import stationRoute from "./Routes/station.js"
import bookingRoute from "./Routes/booking.js"


const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// Middleware to disable strict mode for query (optional)
mongoose.set('strictQuery', false);


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tarunrajasekar:tarun@cluster0.pdayobc.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
};

export default connectDB;

//middleware 
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/station', stationRoute)
app.use('/api/v1/booking', bookingRoute)

app.listen(port, () => {
  connectDB()
  console.log("Server is running on port: " + port)
})