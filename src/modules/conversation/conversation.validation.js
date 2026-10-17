import z from "zod"
import { generalValidationFields } from "../../common/validation.js"


export const createConversation = (lang)=>{
     return z.object({
    params:z.strictObject({
        requestId: generalValidationFields.id(lang) 
    })

})
}  



export const createConversationMessage = (lang)=>{
     return z.object({
    body:z.strictObject({
        content: z.string().min(2).max(50000).optional(),
        receiverId: generalValidationFields.id(lang),
        conversationId : generalValidationFields.id(lang)
    }),

    files: z.array(generalValidationFields.file(lang)).max(3).optional()
}).superRefine((data , ctx)=>{
 
    if(!data.body.content && !data.files?.length){
        ctx.addIssue({
            code:"custom",
            path:['content'],
            message:"missing message content "
        })
    }
})
}




export const getConversationMessaged = (lang)=>{
     return z.object({
    params:z.strictObject({
        conversationId: generalValidationFields.id(lang) 
    })

})
}  