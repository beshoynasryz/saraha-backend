import mongoose from "mongoose";


// Define the schema for the user model
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true , 'name is required'],
        trim : true,
        minLenght : [3 , 'name must be at least 3 characters'],
        maxLenght : [50 , 'name must be at most 50 characters']

    },
    email:{
        type : String,
        required : [true , 'email is required'],
        unique : true,
        match : [/\S+@\S+\.\S+/, 'email must be valid']
    },
    password:{
        type : String,
        required : [true , 'password is required'],
        minLenght : [6 , 'password must be at least 6 characters'],
        maxLenght : [50 , 'password must be at most 50 characters']
    },
    phone :{
        type :String,
        required : [true , 'phone is required'],
       
    },
    confirmed :{
        type : Boolean,
        default : false
    },
    gender :{
        type : String,
        enum : ['male', 'female'],
        required : [true , 'gender is required']

        
    },
    role :{
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    
    

},{timestamps : true , versionKey : false}) 


// Create the user model
const User = mongoose.model('User', userSchema);

export default User;
// Export the user model
    