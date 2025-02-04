import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
 
   content:{
         type : String,
         required : [true , 'content is required'],
         trim : true,
         minLenght : [3 , 'content must be at least 3 characters'],
         maxLenght : [50 , 'content must be at most 50 characters']
   },
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    }


   
}
,{timestamps : true , versionKey : false})


const Message = mongoose.model('Message', messageSchema);   
export default Message;
