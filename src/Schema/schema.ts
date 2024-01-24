import { GraphQLObjectType,GraphQLInt,GraphQLString, GraphQLList, buildSchema, GraphQLNonNull } from "graphql";
import UserController from "../Controller/User";
import ProductController from "../Controller/Product";
import OrderController from "../Controller/Order";

const {create,update,deleted,getAll,getById,login}=new UserController
const {createProduct,getProducts,updateProduct,deleteProduct,getProduct}=new ProductController
const {createOrder,getOrder,getOrders,updateOrder,deleteOrder}=new OrderController
const UserType=new GraphQLObjectType({
    name:"Users",
    fields:{
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        password:{type:GraphQLString},
        email:{type:GraphQLString},
        nickName:{type:GraphQLString},
    }
})

const productType=new GraphQLObjectType({
    name:"Product",
    fields:{
        id:{type:GraphQLInt},
        product_name:{type:GraphQLString},
        product_category:{type:GraphQLString},
        product_orgin:{type:GraphQLString},
        product_price:{type:GraphQLString},
        product_coverImg:{type:GraphQLString},
        product_Imgs:{type:GraphQLString},
        user_created:{type:GraphQLInt}
    }
})
const orderType=new GraphQLObjectType({
    name:"Order",
    fields:{
        id:{type:GraphQLInt},
        order_products:{type:new GraphQLList(GraphQLString)},
        order_status:{type:GraphQLString},
        order_created:{type:GraphQLInt},
        order_addressOne:{type:new GraphQLList(GraphQLString)},
        order_adressTwo:{type:new GraphQLList(GraphQLString)},
        createdAt:{type:GraphQLString},
        updatedAt:{type:GraphQLString}
    }
})
export const RootQuery=new GraphQLObjectType({
 //User Query  
name:"UserQuery",
fields:{
 getAllUsers:{
    type:new GraphQLList(UserType),
    args:{id:{type:GraphQLInt}},
    resolve(args){
        return getAll()
    }
 },
 getUser:{
    type:UserType,
    args:{id:{type:GraphQLInt}},
    resolve(parent,args){
        return getById(args.id)
    }
 },
 // Product Query
 getAllProducts:{
    type:new GraphQLList(productType),
    args:{token:{type:GraphQLString}},
     async resolve(parent,args){
      //createProduct(args.token)
       return await getProducts()
    }
 },
 getProduct:{
    type:productType,
    args:{id:{type:GraphQLInt}},
    async resolve(parents,args){
        return await getProduct(args.id)
    }
 },
 // Order Query
 gatALlOrders:{
    type:new GraphQLList(orderType),
    async resolve(){
        return await getOrders()
    }
 },
 getOrder:{
    type:orderType,
    args:{id:{type:GraphQLInt}},
    async resolve(parent,args){
      return await getOrder(args.id)
    }
 }
}
})

export const Mutation=new GraphQLObjectType({
    //User Mutation
    name:"UserMutation",
    fields:{
        creatUser:{
            type:GraphQLString,
            args:{
                name:{type:GraphQLString},
                password:{type:GraphQLString},
                email:{type:GraphQLString},
                nickName:{type:GraphQLString},
            },
            resolve(parent,args){     
                return create(args)
            }
        },
        loginUser:{
            type: GraphQLString,
            args:{
                password:{type:GraphQLString},
                email:{type:GraphQLString},
            },
            resolve(parent,args){     
                return login(args)
            }
        },
        updateUser:{
            type:UserType,
            args:{
                id:{type:GraphQLInt},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                nickName:{type:GraphQLString},
            },
            resolve(parent,args){
                console.log("args",args)
                return update(args.id,args)
            }
        },
        deleteUser:{
            type:UserType,
            args:{id:{type:GraphQLInt}},
            resolve(parents,args){
                return deleted(args.id)
            }
        },
        // Product Mutation
        createProduct:{
            type:GraphQLString,
            args:{
                token:{type:GraphQLString},
                product_name:{type:GraphQLString},
                product_category:{type:GraphQLString},
                product_orgin:{type:GraphQLString},
                product_price:{type:GraphQLString},
                product_coverImg:{type:GraphQLString},
                product_Imgs:{type:new GraphQLList(GraphQLString)},
            },
             async resolve(parents,args){
                return await createProduct(args,args.token)
             }
        },
        updateProduct:{
            type:GraphQLString,
            args:{
                id:{type:GraphQLInt},
                product_name:{type:GraphQLString},
                product_category:{type:GraphQLString},
                product_orgin:{type:GraphQLString},
                product_price:{type:GraphQLString},
                product_coverImg:{type:GraphQLString},
                product_Imgs:{type:new GraphQLList(GraphQLString)},
        },
            async resolve(parents,args){
                return await updateProduct(args.id,args)
            }
        },
        deleteProduct:{
            type:GraphQLString,
            args:{id:{type:GraphQLInt}},
            async resolve(parents,args){
               return await deleteProduct(args.id)
            }
        },
        createOrder:{
            type:GraphQLString,
            args:{
            token:{type:GraphQLString},    
            order_products:{type:new GraphQLList(GraphQLString)},
            order_status:{type:GraphQLString},
            order_addressOne:{type:new GraphQLList(GraphQLString)},
            order_adressTwo:{type:new GraphQLList(GraphQLString)}
        },
        async resolve(parent,args){
            return await createOrder(args.token,args)
        }
        },
        updateOrder:{
            type:GraphQLString,
            args:{
                id:{type:GraphQLInt},  
                order_products:{type:new GraphQLList(GraphQLString)},
                order_status:{type:GraphQLString},
                order_addressOne:{type:new GraphQLList(GraphQLString)},
                order_addressTwo:{type:new GraphQLList(GraphQLString)}
            },
            async resolve(parents,args){
                 return await updateOrder(args.id,args)
            }
        },
        deleteOrder:{
            type:GraphQLString,
            args:{id:{type:GraphQLInt}},
            async resolve(parents,args){
               return await deleteOrder(args.id)
            }
        },
    }
})


