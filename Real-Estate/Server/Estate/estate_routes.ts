import express from "express";
import { add_apartment, get_apartmentby_id } from "./estate_controller";
import multer from "multer";
import { verify_token } from "../Helper/verify_token";

const estate_route = express.Router();

// Set the upload destination and the max number of files allowed
const upload = multer({ dest: "EstateImages/", limits: { files: 5 } });

estate_route.post(
  "/add_apartment",
  verify_token,
  upload.array("estatefile", 5),
  add_apartment
);

estate_route.get("/:apartment_id", get_apartmentby_id);
export default estate_route;
