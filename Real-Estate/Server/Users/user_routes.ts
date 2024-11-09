import express from "express";
import { sign_up, sign_in } from "./user_controller";
import { parseBody } from "../Helper/parser";
import { connect_db } from "../database_connect";
export const user_Route = express.Router();

user_Route.post("/signup", parseBody(), sign_up);
user_Route.post("/signin", parseBody(), sign_in);
export default user_Route;
