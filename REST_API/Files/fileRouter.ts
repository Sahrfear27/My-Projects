import express from "express";

import multer from "multer";

import { verifyFunction } from "../VerifyToken/token";
import { delete_picture, post_picture } from "./fileController";

const upload = multer({ dest: 'uploads/' }); //Create Folder
const file_Routes = express.Router({ mergeParams: true });

file_Routes.post('/', verifyFunction, upload.single('myfile'), post_picture);
file_Routes.delete('/', verifyFunction, delete_picture);

export default file_Routes;


