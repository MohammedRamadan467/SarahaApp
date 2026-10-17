import {Router} from 'express';
import { successResponse } from '../../common/utlis/success.response.js';
import { uploadMiddleware } from '../../middleware/multer.middleware.js';
import { fileValidation, localFielupload } from '../../common/utlis/index.js';
import { createMessage, deleteMessage, getAllMessages, getMessage } from './message.service.js';
import { validation } from '../../middleware/validation.middleware.js';
import * as validators from './message.validation.js'
import { authentication, bearerAuth } from '../../middleware/authentication.middleware.js';

const router = Router();
const messageFolderName = "messages"

router.post("/" ,
async (req , res , next)=>{

  if (req.headers['authorization']) {
     await bearerAuth({req})
  }
  next()
},

uploadMiddleware({
    multerMiddleware: localFielupload().array("attachments" , 3),
      validation:fileValidation.image,
      customPath:messageFolderName,
      isRequired:false
    }),

validation(validators.createMessage),
async (req,res,next)=>{
    
const data = await createMessage(req.body , req.files , req.user)
return successResponse({res , status:201 , data })
})



router.get("/" ,authentication(),validation(validators.allMessage) ,async(req,res,next)=>{
const data = await getAllMessages(req.validate.query , req.user)
return successResponse({res , status:200 , data})
})


router.get("/:messageId" ,authentication(),validation(validators.getMessageByID) ,async(req,res,next)=>{
const data = await getMessage( req.validate.params , req.user)
return successResponse({res , status:200 , data})
})

router.delete("/:messageId" ,authentication(),validation(validators.deleteMessage) ,async(req,res,next)=>{
const data = await deleteMessage( req.validate.params , req.user)
return successResponse({res , status:200 , data})
})



export default router;

