import { Order } from "../models/Order"
import UserController from "./User"

export default class OrderController{
constructor(private auth=new UserController){}
AuthUser=this.auth.Auth  

createOrder=async (token:string,data:any)=>{
const user=await this.AuthUser(token)    
const asArray=Object.entries(data)
const filterdObj=asArray.filter(([key,value])=>key!=="token")
const Data=Object.fromEntries(filterdObj)
const order=await Order.create({...Data,order_created:user?.toJSON().id,createdAt:Date.now()})
await order.save()
return "order created successfull"
}
getOrder=async(id)=>{
const order=await Order.findOne({where:{id}})
return order
}
updateOrder=async(id:Number,data:any)=>{
const order=await this.getOrder(id)
const asArray=Object.entries(data)
const filterdObj=asArray.filter(([key,value])=>key!=="id")
const Data=Object.fromEntries(filterdObj)
const newOrder= await order?.update({...Data,updatedAt:Date.now()})
return 'order updated successfull'
}
deleteOrder=async(id:Number)=>{
await Order.destroy({
    where:{id}
})
return "order removed successfull"
}
getOrders=async()=>{
    const orders=await Order.findAll()
    return orders
}    
}