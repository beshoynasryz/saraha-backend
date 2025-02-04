import Message from "../../DB/models/messageModel.js";
import asyncHandler from "express-async-handler";
import User from "../../DB/models/userModel.js";


// @desc Send a message
// @route POST /api/messages
// @access Private
