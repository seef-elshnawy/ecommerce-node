import { app } from "./app";
//import * as db from './models';
import graphql, { GraphQLSchema } from 'graphql'
import {graphqlHTTP} from 'express-graphql'
import { Mutation, RootQuery } from "./Schema/schema";
import { Request,Response, request, response } from "express"
import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config=require(__dirname + "/config/config.json")[env]
export const sequelize=new Sequelize(config.database, config.username, config.password, config)

sequelize.sync({force:false,alter:true}).then((req)=>{
    app.listen(8000)
    console.log('Express server has started on port 8000') 
    console.log('database connected successfully')
})
//const Mutation='mutstion'
const data={
    value:"seef"
}
const schema=new GraphQLSchema({query:RootQuery,mutation:Mutation})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true,
}))
