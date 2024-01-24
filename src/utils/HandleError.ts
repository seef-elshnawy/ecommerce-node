export class AppError extends Error{
statusCode:number
status:string
isOpretional: boolean
constructor(message:string,statusCode:number){
super(message)
this.statusCode=statusCode
this.status=`${statusCode}`.startsWith("4") ? "fail" :"server error"
Error.captureStackTrace(this,this.constructor)
}}