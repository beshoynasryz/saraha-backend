import { EventEmitter } from "events";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/sendEmail.js";


export const eventEmitter = new EventEmitter();

eventEmitter.on("sendEmail", async (data) => {
   //send email
        const { email } = data;
        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "10m" });
        const link = `http://localhost:3000/api/user/confirmEmail/${token}`;
        await sendEmail(email , "confirm email" , `click <a href=${link}>here</a> to confirm your email` , `click <a href=${link}>here</a> to confirm your email`);
     
});
