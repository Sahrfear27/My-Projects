import express from "express";
import { add_apartment } from "./estate_controller";
import multer from "multer";
import { verify_token } from "../Helper/verify_token";
const estate_route = express.Router();
const upload = multer({ dest: "EstateImages/" });

estate_route.post(
  "/add_apartment",
  verify_token,
  upload.single("estatefile"),
  add_apartment
);

export default estate_route;
