import Station from '../models/StationSchema.js'

export const addStation = async (req, res) => {
    const {name, address, photo, price, type, slot, bio} = req.body
    try{
        let station = null
        station = await Station.findOne({name})
        if (station){
            return res.status(400).json({message:'Station alrady exist'})
        }
        station = new Station({
            name, photo, address, price, type, slot, bio
        })
        await station.save()
        res.status(200).json({success:true, message:'Station successfully created'})
    } catch(err){
        res.status(500).json({success:false, message:'Internal server error, Try again'})
    }
}

export const getSingleStation = async (req, res) => {
    const id = req.params.id
    try {
        const station = await Station.findById(id)
        res.status(200).json({success: true, message: "Station found", data: station})
    } catch (err) {
        res.status(404).json({success: false, message:"No station found"})
    }
}

export const getAllStation = async(req, res) => {
    try {
        const {query} = req.query
        let stations
        if (query) {
            stations = await Station.find({
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {address: {$regex: query, $options: "i"}},
                    {type: {$regex: query, $options: "i"}}
                ]
            })
        } else {
            stations = await Station.find({})
        }

        res.status(200).json({success: true, message: "Station found", data:stations})
    } catch (err) {
        res.status(500).json({success:false, message:'Station not found'})
    }
}