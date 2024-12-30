import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { jwtcontent } from "../jwt_type";
import { ErrorWithStatus } from "./errorhandler";

export const verify_token: RequestHandler = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const secret_key = process.env.PRIVATE_KEY;

    // Check for secret key in environment variables
    if (!secret_key) {
      throw new ErrorWithStatus("Secret Key does not exist", 500);
    }

    // Check for authorization header
    if (!header) {
      throw new ErrorWithStatus("Token is required", 401);
    }

    // Extract token from header
    const token = header.split(" ")[1];

    if (!token) {
      throw new ErrorWithStatus("Token format is incorrect", 401);
    }

    // Verify and decode token
    const decoded_token = verify(token, secret_key) as jwtcontent;

    if (!decoded_token) {
      throw new ErrorWithStatus("Invalid token signature", 401);
    }

    // Attach token data to the request object and go next
    req.tokenData = decoded_token;

    next();
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};
