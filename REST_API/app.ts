import express, { NextFunction, Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";

import morgan from "morgan";
import cors from 'cors';
import helmet from "helmet";

import { ErrorWithStatus } from "./errorHandler";
import { connectToDatabase } from "./connect_db";
import { user_Route } from "./Users/userRoute";
import course_Routes from "./Course/courseRoute";
import { verifyFunction } from "./VerifyToken/token";
import { countRequest } from "./counter";


// Init
const app = express();
connectToDatabase();


// Config
app.set('port', 4003);


// midware
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
} else {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: "a" });
    app.use(morgan('combined', { stream: accessLogStream }));
}
app.use(helmet());
app.use(cors());


// Routes
// app.use(countRequest);
app.use("/users", user_Route);
app.use("/courses", verifyFunction, course_Routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorWithStatus("Route Not Found", 404));
});

// Error Handle 
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorWithStatus) {
        res.status(err.status).send(err.message);
    }
    else if (err instanceof Error) {
        res.status(500).send(err.message);
    }
    else {
        res.status(500).send("An Unknown Error Occur");
    }
});


app.listen(app.get('port'), () => console.log("Listining to port" + " " + app.get('port')));
