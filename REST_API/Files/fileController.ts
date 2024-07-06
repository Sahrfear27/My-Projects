import { RequestHandler, } from "express";

import { StandardResponse } from "../standardResponse";
import { GUEST_PICTURE, UserModel } from "../Models&Schemas/userSchema";


export const post_picture: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
    //persist req.files
    try {
        const { user_id } = req.params;

        // console.log(req.file);
        const results = await UserModel.updateOne(
            { _id: user_id },
            { $set: { picture: req.file } }
        );
        // console.log(results);
        res.json({ success: true, data: results.modifiedCount });
    } catch (error) {
        console.log(error);
    }
};

export const delete_picture: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await UserModel.updateOne(
            { _id: user_id, active: true, },
            { $set: { picture: GUEST_PICTURE }, }
        );
        res.json({ success: true, data: 1 });
    } catch (error) {
        console.log(error);
    }
};

