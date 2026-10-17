import { BadException, NotfoundException, UnauthorizedException } from "../../common/exceptions/error.exception.js"
import * as requestRepository from "../../common/repository/request.repository.js"
import * as messasgeRepository from "../../common/repository/message.repository.js"
import * as conversationRepository from "../../common/repository/conversation.repository.js"
import * as userRepository from "../../common/repository/user.repository.js"
import * as ConversationMessageRepository from "../../common/repository/conversationMessage.repository.js"



export const createConversation = async ({requestId} , user)=>{
    const request = await requestRepository.findById({id:requestId})
    
     if (!request) throw NotfoundException("Request not found")
     if(request.status !== "accepted") throw NotfoundException("Request not accepted")
     const message = await messasgeRepository.findById({id:request.messageId})
     if (!message) throw NotfoundException("message not found")
        
     if(message.senderId.toString()!== user._id.toString() && message.receiverId.toString()!== user._id.toString()) throw UnauthorizedException("You are not authorized to create conversation")
    
    const conversation = await conversationRepository.createOne({
        data:{
            senderId: message.senderId,
            receiverId: message.receiverId,
            originalMessageId: message._id
        }
    })
     return conversation
}


export const createConversationMessage = async ({ content , receiverId , conversationId } = {} , files = [] , user = undefined)=>{


    const conversation = await conversationRepository.findById({
         id : conversationId
        })
     if (!conversation)  throw NotfoundException("Conversation not found")


     const checkReceiverExist = await userRepository.findById({
         id : receiverId
        })

    const isParticipant =
    conversation.senderId.toString() === user._id.toString() ||
    conversation.receiverId.toString() === user._id.toString();

     if (!isParticipant) {
    throw ForbiddenException("You are not a participant");
   }

   const isReceiver =
    conversation.senderId.toString() === receiverId.toString() ||
    conversation.receiverId.toString() === receiverId.toString();

     if (!isReceiver) {
    throw BadException("Receiver is not in this conversation");
    }

     if (!checkReceiverExist)  throw NotfoundException("Invalid receiverId")

     const message = await ConversationMessageRepository.createOne({
         data:{
            receiverId,
            content,
            attachments: files.map(ele => ele.path),
           ...( user ? {senderId:user._id} : {}),
           conversationId
         }
        })

        return message

}




export const getAllConversationMessages = async ({conversationId} = {} , user = undefined)=>{
    
    const conversation = await conversationRepository.findById({
         id : conversationId
        })
     if (!conversation)  throw NotfoundException("Conversation not found")

    const isParticipant =
    conversation.senderId.toString() === user._id.toString() ||
    conversation.receiverId.toString() === user._id.toString();

     if (!isParticipant) throw ForbiddenException("You are not a participant");

      const ConversationMessages = await ConversationMessageRepository.find({
        filter:{
            conversationId
        }
    })

    return ConversationMessages
}
