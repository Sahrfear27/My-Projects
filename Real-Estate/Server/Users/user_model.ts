import { InferSchemaType, Schema, model } from "mongoose";

// Create a guest picture for the user.

export const GUEST_PICTURE = {
  originalname: "guest.jpeg",
  mimetype: "assets/jpeg",
  path: "assets/guest.jpeg",
  size: 150,
};
// Create user model
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
