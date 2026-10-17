import {authenticationController , messageController ,requestController,userController} from './modules/index.js'
import {globalErrorHandling} from './middleware/index.js'
import express from 'express'
import { ORIGINS, PORT } from './config.js'
import { bootstarpDB } from './DB/connection.db.js'
import helmet  from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import { generateLimiter } from './common/utlis/limiter.js'
const app = express()
await bootstarpDB(app,PORT)


// var corsOptions = {
//   origin: function (origin, callback) {
//      if (!ORIGINS.includes(origin)) {
//         callback(new Error("unauthorized origin" , {cause:{status:401}} , ORIGINS))
//      }else{
//         callback(null , ORIGINS)
//      }
//   }
// }

// app.use(cors(corsOptions))

const limiter = generateLimiter({limit:1000})

app.set("trust proxy" , true)
app.use(helmet(),cors() ,morgan("dev") ,limiter ,express.json())
app.use("/assets" , express.static("./assets"))

//application-routing
app.all('/', async (req, res) => res.status(200).json({message:"Welcome Application routing 💕"}))

app.use("/auth",authenticationController) 
app.use("/message",messageController)
app.use("/user",userController)
app.use("/request",requestController)


app.all("{/*dummy}" ,(req,res,next)=>{
    res.status(404).json({message:"invalid Application routing"})
})

// error middleware
app.use(globalErrorHandling);









