import exp from "constants";
import express from "express";
import { approve_reject_estate, get_all_properties } from "./admin_controller";
import { parseBody } from "../Helper/parser";
import { verify_token } from "../Helper/verify_token";

const admin_route = express.Router();
admin_route.get("", verify_token, get_all_properties);
// Route to Approve/Reject an Estate
admin_route.patch(
  "/:property_id",
  verify_token,
  parseBody(),
  approve_reject_estate
);

export default admin_route;
