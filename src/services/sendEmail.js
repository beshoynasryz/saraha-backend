
import nodemailer from "nodemailer";

export const sendEmail = async (to , subject , text , html) =>{
    
    
const transporter = nodemailer.createTransport({
    service: 'gmail',
     auth: {
       user: process.env.email,
       pass: process.env.password,
     },
   });
   
     const info = await transporter.sendMail({
       from: `"beshoy nasry" <${process.env.email}>`, // sender address
       to:to ? to : "bneeeee0@gmail.com" , // list of receivers
       subject: subject ? subject : "Hello" , // Subject line
       text: text ? text : "Hello world?" , // plain text body
       html: html ? html : "<b>Hello world?</b>" , // html body
     });
   
   if(info.accepted.length ) {
         return true
     }
       return false
}

