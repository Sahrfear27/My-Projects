import { RequestHandler } from "express";
import { StandardResponse } from "../standardResponse";
import { Course, courseModel } from "../Models&Schemas/lecturerSchema";
import { UserModel } from "../Models&Schemas/userSchema";


export const postCourse: RequestHandler<unknown, StandardResponse<Course>, { title: string, description: string; }, unknown> = async (req, res, next) => {
    try {
        const { _id, fullname: { first, last }, email } = req.userInfo;
        const { title, description } = req.body;

        // Check if user is active
        const activeUser = await UserModel.findOne(
            { _id: _id, active: true }
        );
        if (!activeUser) throw new Error("User is Inactive");
        const data = {
            title,
            description,
            created_by: { user_id: _id, fullname: `${first} ${last}`, email }
        };
        const newCourse = await courseModel.create(data);
        res.json({ success: true, data: newCourse });
    } catch (error) {
        console.log(error);
    }
};

export const getCourses: RequestHandler<unknown, StandardResponse<Course[]>, Course, { page?: number, action: string; }> = async (req, res, next) => {
    try {
        const page_size = 15;
        const { _id } = req.userInfo;

        // Check if user is active
        const activeUser = await UserModel.findOne(
            { _id: _id, active: true }
        );
        if (!activeUser) throw new Error("User is Inactive");

        if (req.query.action === "own") {
            const ownCourse = await courseModel.find(
                { "created_by.user_id": _id },
                { "_id": 0, "description": 1, "title": 1 }
            )
                .skip(((req.query.page || 1) - 1) * page_size)
                .limit(page_size);
            console.log("World");
            console.log(ownCourse);
            res.json({ success: true, data: ownCourse });
        } else if (req.query.action === "all") {
            const allCourse = await courseModel.find(
                {},
                { _id: 0, description: 1, title: 1 }
            )
                .skip(((req.query.page || 1) - 1) * page_size)
                .limit(page_size);
            console.log("Hello");
            console.log(allCourse);
            res.json({ success: true, data: allCourse });
        } else {
            throw new Error("Invalid action parameter");
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCourseById: RequestHandler<{ course_id: string; }, StandardResponse<Course | null>, unknown, unknown> = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const { _id } = req.userInfo;

        // Check if user is active
        const activeUser = await UserModel.findOne(
            { _id: _id, active: true }
        );
        if (!activeUser) throw new Error("User is Inactive");

        const getOneCourse = await courseModel.findOne(
            { _id: course_id },
            { title: 1, description: 1, _id: 0 }
        );
        res.json({ success: true, data: getOneCourse });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCourse: RequestHandler<{ course_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.userInfo;
        const { course_id } = req.params;

        // Check if user is active
        const activeUser = await UserModel.findOne(
            { _id: _id, active: true }
        );
        if (!activeUser) throw new Error("User is Inactive");

        const deleteCourseFromStudent = await courseModel.deleteOne(
            { _id: course_id, "created_by.user_id": _id }
        );

        res.json({ success: true, data: deleteCourseFromStudent.deletedCount });
    } catch (error) {
        console.log(error);
    }

};

export const putCourse: RequestHandler<{ course_id: string; }, StandardResponse<number>, Course, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.userInfo;
        const { course_id } = req.params;
        const { title, description } = req.body;

        // Check if user is active
        const activeUser = await UserModel.findOne(
            { _id: _id, active: true }
        );
        if (!activeUser) throw new Error("User is Inactive");

        const updateStudentCourse = await courseModel.updateOne(
            { _id: course_id, "created_by.user_id": _id, },
            {
                $set: {
                    "title": title,
                    "description": description
                }
            }
        );
        res.json({ success: true, data: updateStudentCourse.modifiedCount });
    } catch (error) {
        console.log(error);
    }
};