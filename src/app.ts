import express, { NextFunction, Request, Response } from "express";
import errorController from "./Controller/error.controller";
import { AppError } from "./utils/HandleError";
import UserController from "./Controller/User";
export const app =express()
app.use(express.json())
const { handlingErrors}=new errorController
app.use(handlingErrors)