import {User} from '../models/User'
import { NextFunction, Request,Response } from 'express'
import errorAsync from '../utils/catchAsync'
import { AppError } from '../utils/HandleError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default class UserController{
  constructor(private error=new errorAsync()){}
  catchAsync=this.error.catchAsync
   create=async(data)=>{
    const hash=await bcrypt.hash(data.password,12)
    const email=await User.findOne({where:{email:data.email}})
    if(email){
      return new AppError('this email already used before',400)
    }
     const user=await User.create({name:data.name,email:data.email,password:hash,nickName:data.nickName}) 
     user.save()
     return 'user created successfull' 
  }
  login=async (data:Object)=>{
    //@ts-expect-error
    const user=await User.findOne({where:{email:data.email}})
    if(user){
      //@ts-expect-error
      const validate=await bcrypt.compare(data.password,user.password)
      //@ts-expect-error
      const token= jwt.sign({id:user.id},process.env.secret,{expiresIn:process.env.expiresIn})
      console.log(validate)
      if(!validate) return new AppError('invalid credential',401)
      return token
    }else{
      return new AppError('invalid credential',401)
    }
  }
  getAll=async()=>{
       const users=await User.findAll()
       /*res.status(200).json({
        users
       })*/
       return users
  }
  getById=async(id:number)=>{
    const user = await User.findByPk(id)
    return user
  }
  update=async(id:number,data:Object)=>{
    console.log(data)
    //start filtering id from the data object
    const asArray=Object.entries(data)
    const filterdObj=asArray.filter(([key,value])=> typeof value==='string')
    const Data=Object.fromEntries(filterdObj)
    // end 
    const newData= await User.update(Data,{where:{id}})
    if(!newData) return new AppError("user is not found", 404)
    return 'updated successfull'
  }
  deleted=async (id:number)=>{
    await User.destroy({
        where:{
            id
        }
    })
    return {
        message:"deleted successfull"
    }
  }
  Auth=async (token:string)=>{
      const userId=jwt.verify(token,(process.env.secret as string))
      //@ts-expect-error
      const user=await User.findOne({where:{id:userId.id}})
      return user
  }
}