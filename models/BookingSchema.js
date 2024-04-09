import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    /*ticketPrice: { type: String, required: true },*/
    stationName: {type: String, required: true},
    type: { type: String, required: true },
    slot: { type: Number, required: true },
    slotDate: {
      type: Date,
      required: true,
    },
    startTime: { type: Number, required: true},
    endTime: { type: Number, required: true},
    /*status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },*/
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
