import express from "express";

import multer from "multer";

import { verify_token } from "../Helper/verify_token";
import { delete_picture, post_picture } from "./user_profile_controller";

// Create an image to add the profiles
const upload = multer({ dest: "UserImages/" });
const profile_routes = express.Router({ mergeParams: true });

profile_routes.post(
  "/add_profile",
  verify_token,
  upload.single("userfile"),
  post_picture
);
profile_routes.delete("/remove_profile", verify_token, delete_picture);

export default profile_routes;
