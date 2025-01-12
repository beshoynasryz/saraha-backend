import User from "../../DB/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const signUp = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phone) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ name, email, password: hashPassword, phone });

        if (!user) {
            console.error("User creation failed", { name, email, phone });
            return res.status(500).send({ message: "Failed to create user" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        // Remove password from the response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.status(201).send({
            message: "User created successfully",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({ message: "Error occurred", error: error.message });
    }
};

export const signIn = async (req, res, next) => {
    try {
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
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).send({ message: "Error occurred", error: error.message ,stack : error.stack ,error });
    }
};

