import { RequestHandler, } from "express";
import { StandardResponse } from "../standardResponse";
import { Course, Lecture, courseModel } from "../Models&Schemas/lecturerSchema";


export const addNewLecture: RequestHandler<{ course_id: string; }, StandardResponse<Lecture | Course>, Lecture, unknown> = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const { title, description, url } = req.body;
        const { _id } = req.userInfo;
        const newLecture = {
            title,
            description,
            url,
        };
        const addLecture = await courseModel.findOneAndUpdate(
            { "created_by.user_id": _id, _id: course_id, },
            { $push: { lectures: newLecture } }
        );
        if (!addLecture) throw new Error("Sorry 🫤 ! User do not own this course");
        res.json({ success: true, data: addLecture });
    } catch (error) {
        console.log(error);
    }
};

export const getLectures: RequestHandler<{ course_id: string; }, StandardResponse<Lecture[] | null>, unknown, unknown> = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const { _id } = req.userInfo;
        const courses = await courseModel.findOne(
            { "created_by.user_id": _id, _id: course_id },
            { "_id": 0, "lectures.title": 1, "lectures.description": 1, "lectures.url": 1 } // Include URL field
        );
        console.log(courses);
        res.json({ success: true, data: courses?.lectures || null });

    } catch (error) {
        console.log(error);
    }
};

export const replaceLecture: RequestHandler<{ course_id: string; lecture_id: string; }, StandardResponse<number>, Lecture, unknown> = async (req, res, next) => {
    try {
        const { course_id, lecture_id } = req.params;
        const { title, description, url } = req.body;
        const { _id } = req.userInfo;
        console.log(req.params);
        console.log(req.userInfo);
        console.log(req.body);
        const putCourse = await courseModel.updateOne(
            { "created_by.user_id": _id, _id: course_id, "lectures._id": lecture_id },
            {
                $set: {
                    "lectures.$.title": title,
                    "lectures.$.description": description,
                    "lectures.$.url": url,
                },
            }
        );
        console.log(putCourse);
        res.json({ success: true, data: putCourse.modifiedCount });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLecture: RequestHandler<{ course_id: string; lecture_id: string; }, StandardResponse<number>, unknown> = async (req, res, next) => {
    try {
        const { course_id, lecture_id } = req.params;
        const { _id } = req.userInfo;
        const deleteCourse = await courseModel.updateOne(
            { "created_by.user_id": _id, _id: course_id },
            { $pull: { lectures: { _id: lecture_id } } }
        );
        res.json({ success: true, data: deleteCourse.modifiedCount });
    } catch (error) {
        console.log(error);
    }
};

