import { NextFunction, Request, RequestHandler, Response } from "express";
let count = 0;
export const countRequest: RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {

    count++;
    console.log(count);
    next();
}; 