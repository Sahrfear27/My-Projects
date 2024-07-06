import { RequestHandler } from "express";

import { sign } from "jsonwebtoken";
import { compare, hash } from 'bcrypt';

import { StandardResponse } from "../standardResponse";
import { User, UserModel } from "../Models&Schemas/userSchema";


export const signUp: RequestHandler<unknown, StandardResponse<User>, User, unknown> = async (req, res, next) => {
    try {
        const hashedPassword = await hash(req.body.password, 10);
        const { fullname, email } = req.body;
        const newUser = await UserModel.create(
            { "fullname": fullname, "email": email, "password": hashedPassword, }
        );
        res.json({ success: true, data: newUser });
    } catch (error) {
        console.log(error);
    }
};

export const signIn: RequestHandler<unknown, StandardResponse<string>, User, unknown> = async (req, res, next) => {

    try {
        const { password, email } = req.body;
        let userData = await UserModel.findOne({ email });

        if (userData) {
            const verifyPassword = await compare(password, userData.password); //decript the password and compare
            const secret_key = process.env.SECRET_KEY;
            if (verifyPassword && secret_key) {
                const { _id, fullname, email, picture } = userData;
                const jwt = sign({ _id: _id, fullname: fullname, email: email, picture: picture.path }, secret_key);
                // console.log(jwt);
                res.json({ success: true, data: jwt });
            }
        } else {
            throw new Error("Fail to generate a token");
        }
    } catch (error) {
        console.log(error);
    }
};

export const deactivateAccount: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, { action: string; }> = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        if (req.query.action === "deactivate_profile") {
            const user = await UserModel.updateOne(
                { _id: user_id },
                { active: false }
            );
            if (user.modifiedCount == 0) {
                throw new Error("User Do not exist");
            }
            res.json({ success: true, data: user.modifiedCount });

        } else {
            const user = await UserModel.updateOne(
                { _id: user_id },
                { active: true }
            );
            res.json({ success: true, data: user.modifiedCount });
        }
    } catch (error) {
        console.log(error);
    }
};