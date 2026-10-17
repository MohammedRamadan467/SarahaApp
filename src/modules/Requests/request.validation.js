import z from "zod"
import { generalValidationFields } from "../../common/validation.js"


export const identityRequest = (lang)=>{
     return z.object({
    params:z.strictObject({
        messageId: generalValidationFields.id(lang) 
    })

})
}  


export const respondToRequest = (lang)=>{
     return z.object({
    params:z.strictObject({
        requestId: generalValidationFields.id(lang) 
    })

})
}  