import { InferSchemaType, Schema, model } from "mongoose";

export const GUEST_PICTURE = {
  originalname: "guest.jpg",
  // mimetype: "assets/jpg",
  mimetype: "image/jpeg",
  path: "assets/guest.jpg",
  size: 150,
};
const UserSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: {
      type: {
        originalname: String,
        mimetype: String,
        path: String,
        size: Number,
      },
      default: GUEST_PICTURE,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create inferred type from the schema
export type User = InferSchemaType<typeof UserSchema>;

// Create a model object using the schema
export const userModel = model<User>("User", UserSchema);
