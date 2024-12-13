import express from "express";
import {
  add,
  apartments,
  commercials,
  delete_propertyby_id,
  get_propertyby_id,
  houses,
  update_propertyby_id,
  Villas,
} from "./estate_controller";
import multer from "multer";
import { verify_token } from "../Helper/verify_token";

const estate_route = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "EstateImages/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { files: 5 } });
// Set the upload destination and the max number of files allowed
// const upload = multer({ dest: "EstateImages/", limits: { files: 5 } });

estate_route.post("/add", verify_token, upload.array("estatefile", 5), add);
// estate_route.post("/add", uploadFiles, add);

estate_route.put(
  "/:property_id",
  verify_token,
  upload.array("estatefile", 5),
  update_propertyby_id
);
estate_route.delete("/:property_id", verify_token, delete_propertyby_id);

estate_route.get("/apartment", apartments);
estate_route.get("/house", houses);
estate_route.get("/commercial", commercials);
estate_route.get("/villa", Villas);
estate_route.get("/:property_id", get_propertyby_id);

export default estate_route;
