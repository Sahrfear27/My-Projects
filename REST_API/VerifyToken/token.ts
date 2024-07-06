import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { jwtcontent } from "../jwtType";

export const verifyFunction: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const secret_key = process.env.SECRET_KEY;
        if (secret_key) {
            const token = req.headers.authorization?.split(" ")[1];
            if (token) {
                const results = verify(token, secret_key) as jwtcontent;
                // console.log(results);
                req.userInfo = results;
                next();
            }
        } else {
            throw new Error("Key do not match");
        }
    } catch (error) {
        throw new Error("You are not authorized");
    }

};