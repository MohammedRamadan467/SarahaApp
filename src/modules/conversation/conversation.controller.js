import { Router } from "express";
import { authentication } from "../../middleware/authentication.middleware.js";
import { createConversation, createConversationMessage, getAllConversationMessages } from "./conversation.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from './conversation.validation.js'
import { successResponse } from "../../common/utlis/success.response.js";
import { uploadMiddleware } from "../../middleware/multer.middleware.js";
import { fileValidation, localFielupload } from "../../common/utlis/index.js";

const router = Router()
const messageFolderName = "conversationMessages"


router.post("/createConversation/:requestId" ,authentication(),validation(validators.createConversation),async(req,res,next)=>{
const data = await createConversation(req.validate.params , req.user)
return successResponse({res , status:201 , data})
})


router.post("/createConversationMessage" ,authentication() ,uploadMiddleware({
    multerMiddleware: localFielupload().array("attachments" , 3),
      validation:fileValidation.image,
      customPath:messageFolderName,
      isRequired:false
    }),validation(validators.createConversationMessage),async(req,res,next)=>{
const data = await createConversationMessage(req.body , req.files , req.user)
return successResponse({res , status:201 , data})
})


router.get("/:conversationId" ,authentication() ,validation(validators.getConversationMessaged),async(req,res,next)=>{
const data = await getAllConversationMessages(req.validate.params , req.user)
return successResponse({res , status:201 , data})
})

export default router;
