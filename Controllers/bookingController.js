import Booking from '../models/BookingSchema.js'

export const getUserAllBookings = async (req, res) => {
    const userId = req.UserId;
    try {
        const bookings = await Booking.find({userId:userId})
        res.status(200).json({success: true, message: "successful", data: bookings})
    }catch(err){
        res.status(404).json({success: false, message: "Not found"})
    }
}

export const checkAvaliblity = async (req, res) => {
    const {stationName, type, slot, slotDate, startTime, endTime} = req.body
    let result = "Booked"
    try {
        //console.log(stationName, type, slot, slotDate, startTime, endTime)
        const booking = await Booking.find({stationName:stationName, type:type, slot:slot, slotDate:slotDate})
        //console.log(booking)
        if (booking.length === 0){
            result = "Available"
        } else {
            var clashingTime = []
            for (var i = booking[0].startTime; i <= booking[0].endTime; i++){
                clashingTime.push(i)
            }
            const startNum = Number(startTime);
            const endNum = Number(endTime);
            //console.log(clashingTime, clashingTime.includes(startNum+1),(typeof startNum), clashingTime.includes(endNum-1),(typeof endNum))
            if (!(clashingTime.includes(startNum+1) || clashingTime.includes(endNum-1))){
                result = "Available"
            }
        }
        res.status(200).json({success: true, message: "successful", data: result})
    }catch(err){
        res.status(404).json({success: false, message: "Not found"})
    }
}

export const createBooking = async(req, res) => {
    const userId = req.UserId;
    //console.log("Booking: ", userId)
    const {stationName, type, slot, slotDate, startTime, endTime} = req.body
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const newBooking = new Booking({
        userId, stationName, type, slot, slotDate, startTime, endTime
    })
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({success: true, message: "Slot Booked", data: savedBooking})
    } catch (err) {
        res.status(500).json({success: false, message:err.message})
    }
}