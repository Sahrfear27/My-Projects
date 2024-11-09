import { InferSchemaType, Schema, model } from "mongoose";

// Create user model
const UserSchema = new Schema({
  fullname: { type: String, required: true }, // Corrected 'require' to 'required'
  email: { type: String, required: true }, // Corrected 'require' to 'required'
  password: { type: String, required: true }, // Corrected 'require' to 'required'
});

// Create inferred type from the schema
export type User = InferSchemaType<typeof UserSchema>;

// Create a model object using the schema
export const userModel = model<User>("User", UserSchema);
