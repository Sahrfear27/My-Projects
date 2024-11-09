import { User, userModel } from "./user_model";
import { StandardResponse } from "../Helper/standardResponse";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
export const sign_up: RequestHandler<
  unknown,
  StandardResponse<User>,
  User,
  unknown
> = async (req, res, next) => {
  try {
    const hashpassword = await hash(req.body.password, 10);
    const { fullname, email } = req.body;
    const newuser = await userModel.create({
      fullname: fullname,
      email: email,
      password: hashpassword,
    });
    res.json({ success: true, data: newuser });
  } catch (error) {
    next(error);
  }
};

// The moch for sign
export const sign_in: RequestHandler<
  unknown,
  StandardResponse<string>,
  User,
  unknown
> = async (req, res, next) => {
  try {
    // Verify user information.
    // read email and password
    //  if everything is good return jwt payload
  } catch (error) {}
};
