import { NotfoundException } from "../../common/exceptions/error.exception.js"
import * as userRepository from "../../common/repository/user.repository.js"
import * as messasgeRepository from "../../common/repository/message.repository.js"

export const createMessage = async ({ content , receiverId } = {} , files = [] , user = undefined)=>{

     const checkReceiverExist = await userRepository.findById({
         id : receiverId
        })

     if (!checkReceiverExist)  throw NotfoundException("Invalid receiver Id")

     const message = await messasgeRepository.createOne({
         data:{
            receiverId,
            content,
            attachments: files.map(ele => ele.path),
           ...( user ? {senderId:user._id} : {})
         }
        })

        return message

}




export const getAllMessages = async ({type , page , size} = {}, user)=>{

   let filter = {}
   
   if (type == "0") {
      filter ={ receiverId : user._id}

   }else if (type == "1") {
      filter ={ senderId : user._id}
      
   }else{
        filter = { $or:[ {senderId:user._id}, {receiverId:user._id}]} 
   }
         
        const messages = await messasgeRepository.paginate({  
              filter,
              page,
              size,
              options:{
               sort:{createdAt: 1},
               ...(type == "0" ? {select:"-senderId"} : {})

              }
             
        })
         

        return messages

}


export const deleteMessage = async ({messageId} , user)=>{
   
    const data = await messasgeRepository.deleteOne({
      filter:{
         receiverId: user._id,
         _id: messageId
      }
    })

   if (!data.deletedCount) {
         throw NotfoundException("Invalid message id")
   }

   return data

}



export const getMessage = async ({messageId} , user)=>{
   
    const data = await messasgeRepository.findOne({
      filter:{
         receiverId: user._id,
         _id: messageId
      }
    })

   if (!data) {
         throw NotfoundException("Invalid message")
   }

   return data

}