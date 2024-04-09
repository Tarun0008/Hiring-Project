import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'

export const authenticate = async(req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({success:false, message: "No token, authorization denied"})
    }
    try {
        const token = authToken.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        //console.log("Verify: ", decode)
        req.UserId = decode.id
        req.name = decode.name
        next()
    } catch (err) {
        if (err.name === 'TokenExpireError'){
            return res.status(401).json({message: 'Token is expired'})
        }
        return res.status(401).json({success: false, message: 'Invalid Token'})
    }
} 