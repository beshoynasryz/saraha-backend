import User from "../../DB/models/userModel.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res, next) => {
    try {
        console.log("request body :", req.body);

        // Destructure the incoming data
        const { name, email, password, phone } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password || !phone) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // Create new user
        const user = await User.create({ name, email, password : hashPassword , phone });

        // If user creation fails, log and return error
        if (!user) {
            console.error("User creation failed", { name, email, password : hashPassword , phone });
            return res.status(400).send({ message: 'User not created' });
        }

        // Remove password from response
        delete user.password;

        return res.status(201).send({ message: 'User created successfully', user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({ message: 'User not created', error: error.message });
    }
};
