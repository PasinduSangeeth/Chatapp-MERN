import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
export const signup = async (req, res) => {
    const {fullName,email,password}=req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message:"All fields are required"});}
        //hash password
        if (password.length < 6) {
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        const user= await User.findOne({email});
        if (user) {
            return res.status(400).json({message:"Email already exists"});}
            //hash pasword and create a new user
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const newUser=new User({fullName,email,password:hashedPassword});
        
        if (newUser) {
           //generate jwt token here 
           generateToken(newUser._id,res)
           await newUser.save();
           res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
            fullName:newUser.fullName,
            profilePic:newUser.profilePic,
           });

}        else{
            return res.status(400).json({message:"Invalid user data"});
        }

} catch (error) {
        console.log("Error in signup controller:",error.message);
        res.status(500).json({message:"Internal server Error"});      

    };
};


export const login = async (req, res) => {
    const {email,password}=req.body;
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPAsswordCorrect= await bcrypt.compare(password, user.password);
        if (!isPAsswordCorrect) {
            return res.status(400).json({message:"Invalid credentials"});
        }
        //generate jwt token here 
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            profilePic:user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller:",error.message);
        res.status(500).json({message:"Internal server Error"});      
    }
};  

export const logout = (req, res) => {
    try {
        res.cookie('jwt',"",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller:",error.message);
        res.status(500).json({message:"Internal server Error"});      
    }
};
export const updateProfile = async (req, res) => {
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;
        if (!profilePicture) {
            return res.status(400).json({message:"Profile picture is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        res.status(200).json({updateProfile: updatedUser});
    } catch (error) {
        console.log("Error in updateProfile controller:",error.message);
        res.status(500).json({message:"Internal server Error"});      
    }
};
