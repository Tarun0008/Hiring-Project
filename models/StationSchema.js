import mongoose from "mongoose";

const StationSchema = new mongoose.Schema({
  /*email: { type: String, required: true, unique: true },
  password: { type: String, required: true },*/
  name: { type: String, required: true },
  /*phone: { type: Number },*/
  photo: { type: String },
  address: { type: String },
  price: { type: String },
  type: { type: Array },
  slot: { type: Array },
  /*ticketPrice: { type: Number },
  role: {
    type: String,
  },

  // Fields for Stations only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },*/

  bio: { type: String},
  /*about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],*/
});

export default mongoose.model("Station", StationSchema);
