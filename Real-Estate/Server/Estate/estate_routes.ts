import express from "express";
import {
  add,
  get_propertyby_id,
  update_propertyby_id,
  delete_propertyby_id,
  get_properties_by_property_type,
  get_properties_by_listing_type,
  add_review,
  get_reviews,
  get_reviews_id,
  delete_review_by_id,
} from "./estate_controller";
import multer from "multer";
import { verify_token } from "../Helper/verify_token";
import admin_route from "../Admin/admin_route";
import { parseBody } from "../Helper/parser";

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

estate_route.post(
  "/add",
  verify_token,
  parseBody(),
  upload.array("estatefile", 5),
  add
);
estate_route.get("/:property_id", get_propertyby_id);
estate_route.put(
  "/:property_id",
  verify_token,
  parseBody(),
  upload.array("estatefile", 5),
  update_propertyby_id
);
estate_route.delete("/:property_id", verify_token, delete_propertyby_id);
estate_route.get("/type/:propertyType", get_properties_by_property_type);
estate_route.get("/listing/type/:listingType", get_properties_by_listing_type);

// Add review to the property
estate_route.post(
  "/:property_id/reviews",
  verify_token,
  parseBody(),
  add_review
);

// Get all reviews for a property
estate_route.get("/:property_id/reviews", get_reviews);

// Get review by review id
estate_route.get("/:property_id/reviews/:review_id", get_reviews_id);

// Delete reive by review id
estate_route.delete(
  "/:property_id/:review_id",
  verify_token,
  delete_review_by_id
);
estate_route.use("", admin_route);
export default estate_route;
