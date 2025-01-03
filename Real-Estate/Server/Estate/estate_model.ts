import mongoose, { InferSchemaType, Schema, model, Types } from "mongoose";

export const DEFAULT_PICTURE = {
  originalname: "estate.jpg",
  mimetype: "image/jpeg",
  path: "assets/estate.jpg",
  size: 150,
};
//
// Define the schema for reviews
// const reviewSchema = new Schema({
//   review: { type: String, required: true },
//   rating: { type: Number, required: true },
//   by: { user_id: mongoose.Types.ObjectId, fullname: String, email: String },
//   date: { type: Date, required: true, default: Date.now },
// });

// Define the main schema for the real estate model
const estateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: false },
    images: [
      {
        type: {
          originalname: String,
          mimetype: String,
          path: String,
          size: Number,
        },
        default: DEFAULT_PICTURE,
      },
    ],
    addedBy: {
      user_id: mongoose.Types.ObjectId,
      fullname: String,
      email: String,
    },
    listingType: {
      type: String,
      enum: ["rent", "sale"],
      required: true,
      default: "sale",
    },
    propertyType: {
      type: String,
      enum: [
        "apartment",
        "house",
        "commercial",
        "villa",
        "office",
        "townhouse",
        "shop",
        "garage",
      ],
      default: "apartment",
      required: true,
    },
    features: {
      bedrooms: { type: Number, min: 0 },
      bathrooms: { type: Number, min: 0 },
      area: { type: Number, required: true },
      parking: { type: Boolean, default: false },
      furnished: { type: Boolean, default: false },
    },
    // reviews: [reviewSchema],
    reviews: [
      {
        review: { type: String, required: true },
        rating: { type: Number, required: true },
        by: {
          user_id: mongoose.Types.ObjectId,
          fullname: String,
          email: String,
        },
        date: { type: Date, required: true, default: Date.now },
      },
    ],
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create the model and export it
export const Estate = model("Estate", estateSchema);
export type EstateType = InferSchemaType<typeof estateSchema>;

const imageSchema = new Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
});
