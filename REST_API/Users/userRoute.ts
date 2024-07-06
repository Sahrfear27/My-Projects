import express from "express";

import { deactivateAccount, signIn, signUp } from "./userController";
import { verifyFunction } from "../VerifyToken/token";
import file_Routes from "../Files/fileRouter";
import { parseBody } from "../parser";


export const user_Route = express.Router();

user_Route.post('/signup', parseBody(), signUp);
user_Route.post('/signin', parseBody(), signIn);
user_Route.patch('/:user_id', verifyFunction, parseBody(), deactivateAccount);


// Create a mid ware for file
user_Route.use('/:user_id/picture', file_Routes);
export default user_Route;

