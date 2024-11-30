import { RequestHandler } from "express";
import { StandardResponse } from "../Helper/standardResponse";
import { GUEST_PICTURE, userModel } from "../Users/user_model";

export const post_picture: RequestHandler<
  { user_id: string },
  StandardResponse<number>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    // console.log(user_id);
    const result = await userModel.updateOne(
      { _id: user_id },
      { $set: { picture: req.file } }
    );
    // console.log(result);
    res.json({ success: true, data: result.modifiedCount });
    console.log("Profile added successfully");
  } catch (error) {
    console.log(error);
  }
};
export const delete_picture: RequestHandler<
  { user_id: string },
  StandardResponse<number>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    // console.log(user_id);
    const result = await userModel.updateOne(
      { _id: user_id },
      { $set: { picture: GUEST_PICTURE } }
    );
    // console.log(result);
    res.json({ success: true, data: result.modifiedCount });
    console.log("Profile removed successfully");
  } catch (error) {
    console.log(error);
  }
};
