import mongoose from "mongoose"
import { createOne, findOne } from "../../common/repository/base.repository.js"
import { UserModel } from "../../DB/model/user.model.js"
import { ConflictException, NotfoundException } from "../../common/exceptions/error.exception.js"
import bcrypt from 'bcrypt'
import { compare, hash } from "../../common/security/hash.security.js"
import { decryption, encryption } from "../../common/security/encryption.security.js"
import { generateToken } from "../../common/security/token.security.js"


export const signup = async ({email , password , username , phone})=>{

const duplicatedAccount = await findOne({
    model:UserModel ,
     filter:{email} ,
      options:{select:"email"}
    })

if(duplicatedAccount) throw ConflictException("Email exists")

const account = await createOne({
    model:UserModel ,
     data:{
        email ,
         password:await hash(password),
          phone:await encryption(phone),
          username,
        }
    })
return account
}

export const login = async ({email , password })=>{
const account = await findOne({
    model:UserModel , 
    filter:{email} 
})
if(!account) throw  NotfoundException("not Exist")

const match = await compare(password , account.password)

if(!match) throw NotfoundException("not Exist")
account.phone = await decryption(account.phone)

const token = generateToken({
  userId: user._id,
});
return {account , token}
}