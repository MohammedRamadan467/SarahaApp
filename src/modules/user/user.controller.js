import {Router} from 'express';
import { successResponse } from '../../common/utlis/success.response.js';
const router = Router();

router.get("/" , async (req,res,next)=>{
 return successResponse({res , data})
})



export default router;
