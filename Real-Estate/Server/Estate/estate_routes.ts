import express from "express";
import {
  add,
  get_propertyby_id,
  update_propertyby_id,
  delete_propertyby_id,
  get_properties_by_property_type,
  get_properties_by_listing_type,
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
estate_route.post("/add", verify_token, upload.array("estatefile", 5), add);
estate_route.get("/:property_id", get_propertyby_id);
estate_route.put(
  "/:property_id",
  verify_token,
  upload.array("estatefile", 5),
  update_propertyby_id
);
estate_route.delete("/:property_id", verify_token, delete_propertyby_id);
estate_route.get("/type/:propertyType", get_properties_by_property_type);
estate_route.get("/listing/type/:listingType", get_properties_by_listing_type);
export default estate_route;
