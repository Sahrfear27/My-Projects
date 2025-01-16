import express from "express";
import { verify_token } from "../Helper/verify_token";
import { parseBody } from "../Helper/parser";
import { make_payment } from "./payment_controller";
const payment_route = express.Router();

payment_route.post("", verify_token, parseBody(), make_payment);
export default payment_route;
