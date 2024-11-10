import express from "express";
import {
  sign_up,
  sign_in,
  reset_password,
  update_password,
} from "./user_controller";
import { parseBody } from "../Helper/parser";

export const user_Route = express.Router();

user_Route.post("/signup", parseBody(), sign_up);
user_Route.post("/signin", parseBody(), sign_in);
user_Route.post("/reset_password", parseBody(), reset_password);
user_Route.put("/update_password", parseBody(), update_password);
export default user_Route;
