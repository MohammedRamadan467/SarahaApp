import { UserModel } from '../../DB/model/user.model.js'
import * as base from './base.repository.js'


const ModelName = UserModel
// methods add 

export const create = async ({
     data=[] ,
      options={}
    } = {})=>{

return await base.create({model : ModelName , data , options}) || []
}


export const createOne = async ({
     data ,
      options={}
    } = {})=>{
return await base.create({model : ModelName , data:[data] , options}) || []

}

export const insertMany = async ({
  data,
  options = {}

}) => {
  return await base.insertMany({model : ModelName , data , options})
}

//methods find

export const find = async ({
  filter,
  options
} = {}) => {

  return await base.find({model : ModelName , filter , options})
}

export const findById = async ({
  id,
  options
}) => {
    return await base.findById({model : ModelName , id , options})
}

export const findOne = async ({
  filter ={},
  options ={}
  
} = {}) => {

    return await base.findOne({model: ModelName , filter , options})
}


export const paginate = async ({
  filter = {},
  options = {},
  select,
  page = "all",
  size = 5

} = {}) => {

   return await base.paginate({model : ModelName , filter , options , select , page , size})
}

//methods update


export const updateOne = async ({
  filter,
  update,
  options
  

} = {}) => {

    return await base.updateOne({model : ModelName , filter , update , options})
}

export const findOneAndUpdate = async ({
  filter,
  update,
  options,
  

} = {}) => {

   return await base.findOneAndUpdate({model : ModelName , filter , update , options})
}

export const findByIdAndUpdate = async ({
  id,
  update,
  options = { new: true },

}) => {
    return await base.findByIdAndUpdate({model : ModelName , id , update , options})

}


//methods delete

export const deleteOne = async ({
  filter
}) => {
     return await base.deleteOne({model : ModelName , filter})
}

export const deleteMany = async ({
  filter
}) => {
  return await base.deleteMany({model : ModelName , filter});
}

export const findOneAndDelete = async ({
  filter
} = {}) => {
   return await base.findOneAndDelete({model : ModelName , filter});

}