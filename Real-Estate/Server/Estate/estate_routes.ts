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
  update_review,
} from "./estate_controller";
import multer from "multer";
import { verify_token } from "../Helper/verify_token";
import admin_route from "../Admin/admin_route";
import { parseBody } from "../Helper/parser";
import payment_route from "../Payment/payment_route";

const estate_route = express.Router({ mergeParams: true });

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

estate_route.get("/:property_id/reviews", get_reviews);
estate_route.get("/:property_id/reviews/:review_id", get_reviews_id);
estate_route.delete(
  "/:property_id/reviews/:review_id",
  verify_token,
  delete_review_by_id
);
// Update Review
estate_route.put(
  "/:property_id/reviews/:review_id",
  verify_token,
  parseBody(),
  update_review
);
estate_route.use("", admin_route);
estate_route.use("/:property_id", payment_route);
export default estate_route;
