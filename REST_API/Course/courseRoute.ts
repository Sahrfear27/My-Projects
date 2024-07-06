import express from "express";

import { parseBody } from "../parser";
import { deleteCourse, getCourseById, getCourses, postCourse, putCourse } from "./courseController";
import lecture_Route from "../Lectures/lectureRoute";

export const course_Routes = express.Router();
// Controllers function for course routes
course_Routes.post('/', parseBody(), postCourse);
course_Routes.get('/', getCourses);
course_Routes.get('/:course_id', getCourseById);
course_Routes.delete('/:course_id', deleteCourse);
course_Routes.put('/:course_id', parseBody(), putCourse);


// Verify if lecture own the course: By checking their id which is token
course_Routes.use("/:course_id/lectures", lecture_Route);
export default course_Routes;


