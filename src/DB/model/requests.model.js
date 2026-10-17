import mongoose from "mongoose";

const requestsSchema= new mongoose.Schema(
{
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
    },

    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
},
{ 
    
timestamps: true,
autoIndex:true,
strict:true,
strictQuery:true
}
)






export const RequestModel = mongoose.models.Requests || mongoose.model("Request",requestsSchema)

