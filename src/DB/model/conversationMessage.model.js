import mongoose from "mongoose";

const conversationMessageSchema= new mongoose.Schema(
{

content:{
    type:String,
    minLength:2,
    maxLength:50000,
    required:function(){
        return  this.attachments?.length > 0 ? false : true
    }
},
attachments:[String],
senderId:{type:mongoose.Types.ObjectId ,ref:"User"},
receiverId:{type:mongoose.Types.ObjectId ,ref:"User" , required:true},
conversationId:{type:mongoose.Types.ObjectId ,ref:"Conversation" , required:true},


},
{
timestamps:true,
autoIndex:true,
strict:true,
strictQuery:true

}
)

export const conversationMessageModel = mongoose.models.ConversationMessage || mongoose.model("ConversationMessage",conversationMessageSchema)
