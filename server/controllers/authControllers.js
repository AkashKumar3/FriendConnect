import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '20h'})
};

export const registerUser = async(req,res)=>{
    try {
        const {username,  email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }
        
        const userByEmail = await User.findOne({email});
        const userByUsername = await User.findOne({username});

        if(userByEmail || userByUsername) {
            return res.status(400).json({message: 'user already exists'})
        }

        const newUser = new User({username, email, password});
        newUser.save();

        const token = generateToken(newUser._id);
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).json({message: 'error creating user', error: error.message});
    }
};

export const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({message: "Invalid details"});
        }
        const token = generateToken(user._id);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({message: 'Error Logging In', error:error.message});
    }
}
