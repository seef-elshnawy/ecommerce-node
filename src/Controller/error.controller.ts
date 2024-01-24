import { NextFunction, Request, Response } from "express"

const prodErrors=(res:Response,err:any)=>{
if(err.isOpretional){
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })    
}else{
    res.status(500).json({
        status:err.status,
        message:err.message,
        err:err,
        stack:err.stack
    })
}
}
const devErrors=(res:Response,err:any)=>{
res.status(500).json({
    status:err.status,
    message:err.message,
    err:err,
    stack:err.stack
})
}
export default class errorController{
 handlingErrors(err:any,req:Request,res:Response,next:NextFunction){
     err.statusCode=err.statusCode||404
     err.status=err.status || "Bad Request"
     if(process.env.NODE_ENV==="development"){
        devErrors(res,err)
     }else{
        prodErrors(res,err)
     }
     next()
 }
}