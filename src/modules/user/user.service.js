import User from "../../DB/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../../services/sendEmail.js";
import { eventEmitter } from "../../utils/sendEmail.event.js";
dotenv.config();


export const signUp = asyncHandler (async (req, res, next) => {
   
        const { name, email, password, phone ,gender } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phone) {
            return next(new Error("All fields are required"));
            // return res.status(400).send({ message: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

         eventEmitter.emit("sendEmail" , {email})
        
        // Create new user
        const user = await User.create({ name, email, password: hashPassword, phone , gender });

        if (!user) {
            console.error("User creation failed", { name, email, phone });
            return res.status(500).send({ message: "Failed to create user" });
        }


        // Remove password from the response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.status(201).send({
            message: "User created successfully",
            user: userWithoutPassword,
           
        });
 
})

export const signIn =asyncHandler ( async (req, res, next) => {
    
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        // Remove password from the response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.status(200).send({
            message: "User logged in successfully",
            user: userWithoutPassword,
            token,
        });
   
})

export const confirmEmail =asyncHandler (async (req, res, next) => {

    const {token} = req.params;
    if (!token) {
        return res.status(400).send({ message: "No token provided" });
    }

   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(403).send({ message: "Token is invalid" });
        }
        const email = decoded.email;
        const user = await User.findOneAndUpdate({ email }, { confirmed: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        await user.save();
        // Remove password from the response
        const { password: _, ...userWithoutPassword } = user.toObject();
        return res.status(200).send({
            message: "Email confirmed successfully",
            user: userWithoutPassword,
        });


})


export const getProfile =asyncHandler (async (req, res ,next ) =>{
   
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send({ user});

})

