import mongoose from "mongoose";
import "dotenv/config";

const connect_url = process.env.DB_SERVER_URL;

export const connect_db = () => {
  if (!connect_url) {
    console.error("Database connection URL is not defined.");
    return;
  }

  mongoose
    .connect(connect_url)
    .then(() => console.log("Connected Successfully"))
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};
