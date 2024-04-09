import User from '../models/UserSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user => {
    return jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'15d'})
}

export const register = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body
    try{
        let user = null
        user = await User.findOne({email})
        if (user){
            return res.status(400).json({message:'User already exist'})
        }
        if (password != confirmPassword){
            return res.status(400).json({message:"Password isn't matching"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        user = new User({
            name, email, password:hashPassword,
        })
        await user.save()
        res.status(200).json({success:true, message:'User successfully created'})
    } catch(err){
        console.log(err)
        res.status(500).json({success:false, message:'Internal server error, Try again'})
    }
}

export const login = async (req, res) => {
    const {email: reqEmail, password} = req.body
    try{
        let user = null
        user = await User.findOne({email: reqEmail})
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({status:false, message:"Incorrect Password"})
        }
        const token = generateToken(user)
        const {name, email, password, ...rest} = user._doc
        //console.log(name, email, password)
        return res.status(200).json({status:true, message:"Login Successfull", token, data:{...rest, name, email}})

    } catch(err){
        console.error(err);
        return res.status(500).json({status:false, message:"Failed to login"})
    }
}