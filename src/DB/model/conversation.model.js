import mongoose from "mongoose";

const conversationSchema= new mongoose.Schema(
{
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    originalMessageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
    },
},
{ 
    
timestamps: true,
autoIndex:true,
strict:true,
strictQuery:true
}
)



export const conversationModel = mongoose.models.Conversation || mongoose.model("Conversation",conversationSchema)

