import { Schema, InferSchemaType, model } from "mongoose";
export const LectureSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true }
});

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { user_id: Schema.Types.ObjectId, fullname: String, email: String },
    lectures: [LectureSchema]
}, { timestamps: true, versionKey: false });


export type Lecture = InferSchemaType<typeof LectureSchema>;
export type Course = InferSchemaType<typeof CourseSchema>;

export const courseModel = model<Course>('course', CourseSchema);