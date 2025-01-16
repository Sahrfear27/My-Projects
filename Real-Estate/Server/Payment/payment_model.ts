import { InferSchemaType, model } from "mongoose";

const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, // Payment amount in cents (or your chosen unit)
  currency: { type: String, required: true }, // Currency used for the payment (e.g., 'usd')
  paymentIntentId: { type: String, required: true }, // Stripe Payment Intent ID
  transactionId: { type: String }, // Stripe Transaction ID
  status: {
    type: String,
    enum: ["pending", "succeeded", "failed"],
    default: "pending",
  }, // Payment status
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  }, // Associated property
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Payment = model("payment", paymentSchema);
export type PaymentType = InferSchemaType<typeof paymentSchema>;
