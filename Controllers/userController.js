import User from "../models/UserSchema.js"

export const deleteUser = async(req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id) 
        res.status(200).json({success: true, message: "Successfully deleted"})
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to delete'})
    }
}