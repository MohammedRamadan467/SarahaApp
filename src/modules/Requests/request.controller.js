import { Router } from "express";
import { authentication } from "../../middleware/authentication.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from './request.validation.js'
import { getAllRequests, identityRequest, respondToRequest } from "./request.service.js";
import { successResponse } from "../../common/utlis/success.response.js";
const router = Router()

router.post("/identity-requests/:messageId" ,authentication(),validation(validators.identityRequest) ,async(req,res,next)=>{
const data = await identityRequest(req.validate.params , req.user)
return successResponse({res , status:200 , data})
})

router.get("/identity-requests" ,authentication() ,async(req,res,next)=>{
const data = await getAllRequests(req.user)
return successResponse({res , status:200 , data})
})

router.patch("/identity-requests/:requestId" ,authentication() ,validation(validators.respondToRequest) ,async(req,res,next)=>{
const data = await respondToRequest(req.validate.params , req.user , req.query)
return successResponse({res , status:200 , data})
})


export default router;
