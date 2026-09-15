import {authenticationController , messageController ,userController} from './modules/index.js'
import {globalErrorHandling} from './middleware/index.js'
import express from 'express'
import { PORT } from './config.js'
import { bootstarpDB } from './DB/connection.db.js'
import { log } from 'node:console'
import { decryption, encryption } from './common/security/encryption.security.js'
const encValue = await encryption("mahmoud")

const plain = decryption(encValue)
console.log({encValue , plain});

const app = express()
bootstarpDB(app,PORT)


// convert buffer data
app.use(express.json())

//application-routing
app.all('/', async (req, res) =>  {
res.status(200).json({message:"Welcome Application routing 💕"})
} 
)

app.use("/auth",authenticationController)
app.use("/message",messageController)
app.use("/user",userController)

app.all("{/*dummy}" ,(req,res,next)=>{
    res.status(404).json({message:"invalid Application routing"})
})

// error middleware
app.use(globalErrorHandling);



