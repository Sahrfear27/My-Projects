import express from "express";
import { verify_token } from "../Helper/verify_token";
import { parseBody } from "../Helper/parser";
import { get_payment_detail, make_payment } from "./payment_controller";
const payment_route = express.Router({ mergeParams: true });

payment_route.post("/payment", verify_token, parseBody(), make_payment);
payment_route.get("/payment/:payment_id", get_payment_detail);
export default payment_route;
