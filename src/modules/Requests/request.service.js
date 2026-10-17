import { success } from "zod"
import { BadException, ForbiddenException, NotfoundException } from "../../common/exceptions/error.exception.js"
import * as messasgeRepository from "../../common/repository/message.repository.js"
import * as requestRepository from "../../common/repository/request.repository.js"



export const identityRequest = async ({messageId} , user)=>{
    
    const message = await messasgeRepository.findOne({
        filter:{
            _id:messageId
         }
    })  

    if(!message) throw NotfoundException("message not found")
    if(message.receiverId.toString() !== user._id.toString() ) throw ForbiddenException("You connot request this message identity")
    if(!message.senderId ) throw BadException("Sender identity is unavailable")
     
     const exist = await requestRepository.findOne({
        filter:{
            messageId,
            requestedBy:user._id,
            status:{$in:["pending","accepted"]}
        }
     })

    if(exist) throw BadException("Request has already been sent for this message")

    const request = await requestRepository.createOne({
        data:{
            messageId,
            requestedBy : user._id
        }
})
   return request
}



export const getAllRequests = async (user)=>{
    
  const requests = await requestRepository.find({
   filter:{
    status:"pending"
   },
   options:{
    populate:{
        path:"messageId",
        select:"senderId"
    }
   }
})

    const allRequests = requests.filter((ele)=>  ele.messageId && user._id.toString() == ele.messageId.senderId.toString())
    return allRequests
}



export const respondToRequest = async ({requestId} , user , {status})=>{

    if (![ "rejected" , "accepted"].includes(status)) {
        throw BadException("Invalid request status")
    }

    const request = await requestRepository.findOne({
      filter:{
            _id:requestId,
            status:"pending"
         },
      options:{
          populate:{
          path:"messageId",
          select:"senderId"
    }
   }
    })  

    if(!request) throw NotfoundException("request not found")
    if(request.messageId.senderId.toString() !== user._id.toString() ) throw BadException("You connot respond to this request")

    request.status =  status
    await request.save()
     
    if (status == "accepted") {

        return {
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                coverImage:user.coverImage
            }
        }

    }

    return true
   
}