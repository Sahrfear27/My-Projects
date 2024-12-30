import { User, userModel } from "./user_model";
import { StandardResponse } from "../Helper/standardResponse";
import { RequestHandler } from "express";
import { sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import nodemailer from "nodemailer"; // For email
export const sign_up: RequestHandler<
  unknown,
  StandardResponse<User>,
  User,
  unknown
> = async (req, res, next) => {
  try {
    const { fullname, email, password, role } = req.body;
    // Check if email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    // Hash the password
    const hashpassword = await hash(password, 10);

    // Create the new user
    const userCreated = await userModel.create({
      fullname: fullname,
      email: email,
      password: hashpassword,
      role: role || "user",
    });

    if (!userCreated) {
      console.log("user cannot be created");
      res.status(400).json({ success: false, data: null! });
    }
    res.json({ success: true, data: userCreated });
    console.log("User Successfully Created");

    // // Check if email already exists in the database
    // const existingUser = await userModel.findOne({ email });
    // if (existingUser) {
    //   throw new Error("Email already exists");
    // }

    // // Hash the password
    // const hashpassword = await hash(req.body.password, 10);

    // // Create the new user
    // const userCreated = await userModel.create({
    //   fullname: fullname,
    //   email: email,
    //   password: hashpassword,

    // });

    // if (!userCreated) {
    //   console.log("user cannot be created");
    // } else {
    //   res.json({ success: true, data: userCreated });
    //   console.log("User has been created to the database");
    // }
  } catch (error) {
    console.log("User cannot be created", error);
    next(error);
  }
};

export const sign_in: RequestHandler<
  unknown,
  StandardResponse<string>,
  User,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      throw new Error("User not found");
    }
    const matchpassword = await compare(password, user.password);
    if (!matchpassword) {
      throw new Error("Password does not match");
    }

    const secret_key = process.env.PRIVATE_KEY;
    if (!secret_key) {
      throw new Error("Could not sign Token");
    }
    const jwt = sign(
      {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
      secret_key
    );

    // Set the cookie first, then respond with JSON
    res.cookie("jwt", jwt, { httpOnly: true, secure: true });
    res.json({ success: true, data: jwt });

    console.log("Login Was Successful");
    // console.log(jwt);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const reset_password: RequestHandler<
  unknown,
  StandardResponse<string>,
  { email: string },
  unknown
> = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the user exists in the database
    const existing_user = await userModel.findOne({ email });
    if (!existing_user) {
      res.status(404).json({ success: false, data: "User not found" });
      return;
    }

    // Retrieve the secret key from the environment variable
    const secret = process.env.PRIVATE_KEY;
    if (!secret) {
      throw new Error("PRIVATE_KEY is not defined in environment variables.");
    }

    // Create a unique token
    const token = sign(
      {
        _id: existing_user._id,
        fullname: existing_user.fullname,
        email: existing_user.email,
      },
      secret,
      { expiresIn: "1h" }
    );

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetURL = `http://localhost:4007/users/reset_password?token=${token}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Please click the following link to reset your password: ${resetURL}`, // Fallback for plain text clients
      html: `<p>Please <a href="${resetURL}">click here</a> to reset your password.</p>`, // HTML version with clickable link
    });

    res.json({
      success: true,
      data: `Password reset token generated: ${token}`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// An end point to handle the token and reset the password.
export const update_password: RequestHandler<
  unknown,
  StandardResponse<string>,
  { token: string; newpassword: string },
  unknown
> = async (req, res, next) => {
  try {
    const { token, newpassword } = req.body;

    // Step 1: Decode the token to extract user information
    const secret = process.env.PRIVATE_KEY;
    if (!secret) {
      throw new Error("Private Key is not defined");
    }

    let decoded;
    try {
      decoded = verify(token, secret) as { _id: string }; // Decode token
    } catch (error) {
      throw new Error("Token Expired or Invalid");
    }

    const userId = decoded._id; // Extract user ID from decoded token
    if (!userId) {
      throw new Error("User not found");
    }

    // Step 2: Hash the new password
    const hashedPassword = await hash(newpassword, 10);

    // Step 3: Update the user's password in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      throw new Error("Failed to update password");
    }

    // Step 4: Respond with a success message
    res.json({
      success: true,
      data: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
