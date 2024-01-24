import { Product } from "../models/Product"
import UserController from "./User"

export default class ProductController{
    constructor(private auth=new UserController){}
  AuthUser=this.auth.Auth  

  createProduct=async(data:any,token:string)=>{
    const {product_name,product_category,product_price,product_orgin}=data
  const user=await this.AuthUser(token) 
  const asArray=Object.entries(data)
  const filtered= asArray.filter(([key,value])=> key !=='token')
  const Data= Object.fromEntries(filtered)
  const product=await Product.create({...Data,user_created:user?.toJSON().id})
  product.save()
  return 'product created successfull'
  
}
getProducts=async()=>{
    const products=await Product.findAll()
    return products
}
getProduct=async (id:Number)=>{
  const product = await Product.findOne({where:{id}})
  return product
}
updateProduct=async (id:Number,data:any)=>{
const product =await this.getProduct(id)
const asArray=Object.entries(data)
const filtered= asArray.filter(([key,value])=> key !=='id')
const Data= Object.fromEntries(filtered)
const newProduct =await product?.update(Data)
return 'product updated successfull'
}
deleteProduct=async(id:Number)=>{
Product.destroy({
    where:{id}
})
return "product deleted successfull"
}

}