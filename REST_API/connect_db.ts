import mongoose from "mongoose";
import 'dotenv/config';
const connectString = process.env.CONNECTING_STRING;
export function connectToDatabase() {
    if (connectString) {
        mongoose.connect(connectString)
            .then(_ => console.log("Connected Successfully to database"))
            .catch(console.log);
    }
}

console.log();