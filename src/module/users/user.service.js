import User from "../../database/model/user.model.js"
import bcrypt from "bcrypt"
import { registerValidation } from "../../database/validation/user.validation.js"
import { loginValidation } from "../../database/validation/user.validation.js"
import { generateToken } from "../../utils/jwt.js"


export const register = async (req,res)=>{

    try {

        const {error} = registerValidation.validate(req.body)

        if(error){
            return res.json({message:error.details[0].message})
        }

        let {email,password,name,role} = req.body

        let checkUser = await User.findOne({email})

        if(checkUser){
            return res.json({message:"email already exists"})
        }

        let hashedPassword = await bcrypt.hash(password,10)

        let user = await User.create({
            email,
            password:hashedPassword,
            name,
            role
        })

        res.json({message:"user created",user})

    } catch (error) {

        res.json({message:"error",error})

    }

}
export const login = async (req,res)=>{

    try {

        const {error} = loginValidation.validate(req.body)

        if(error){
            return res.json({message:error.details[0].message})
        }

        let {email,password} = req.body

        let user = await User.findOne({email})

        if(!user){
            return res.json({message:"invalid email or password"})
        }

        let match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.json({message:"invalid email or password"})
        }

        let token = generateToken(user)

        res.json({message:"login success",token})

    } catch (error) {

        res.json({message:"error",error})

    }

}
export const profile = async (req,res)=>{

    try {

        const userId = req.user.id

        let user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        res.json({user})

    } catch (error) {

        res.status(500).json({message:"Server error",error})

    }

}