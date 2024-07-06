import express from "express";
import { addNewLecture, deleteLecture, getLectures, replaceLecture } from "./lectureController";
import { parseBody } from "../parser";


const lecture_Route = express.Router({ mergeParams: true });

lecture_Route.post('/', parseBody(), addNewLecture);
lecture_Route.get('/', getLectures);
lecture_Route.put('/:lecture_id', parseBody(), replaceLecture); //update lecture base on course_id and lecture id
lecture_Route.delete('/:lecture_id', deleteLecture);

export default lecture_Route;
