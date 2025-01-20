import { RequestHandler } from "express";
import Stripe from "stripe";
import { StandardResponse } from "../Helper/standardResponse";
import { PaymentType } from "./payment_model";
import { Payment } from "./payment_model";

import { ObjectId } from "mongodb";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const make_payment: RequestHandler<
  { property_id: string },
  StandardResponse<PaymentType>,
  PaymentType,
  unknown
> = async (req, res, next) => {
  try {
    console.log("Making Payment...");

    const { property_id } = req.params;
    console.log(property_id);

    const { amount, currency, propertyId } = req.body;
    const userId = req.tokenData._id;

    if (!propertyId || !userId || !amount || !currency) {
      res.status(400).json({ success: false, data: "Invalid User Input" });
    }

    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        propertyId,
        userId,
      },
    });

    // Prepare the payment object to be stored in the database
    const payment = {
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: "pending",
      propertyId: new ObjectId(property_id),
      userId: userId,
    };

    // Save the payment details into the database
    const result = await Payment.create(payment);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error while making payment:", error);
    next(error);
  }
};

export const get_payment_detail: RequestHandler<
  { property_id: string; payment_id: string },
  StandardResponse<PaymentType[] | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { payment_id } = req.params;
    if (!payment_id) {
      res.status(400).json({ success: false, data: null });
    }

    const payment_info = await Payment.find(
      { _id: payment_id },
      { amount: 1, currency: 1, status: 1, _id: 0 }
    );
    if (!payment_info) {
      res.status(400).json({ success: false, data: null });
    }
    console.log(payment_info);
    res.json({ success: true, data: payment_info });
  } catch (error) {
    console.log(
      "Error occurs while trying to retrive payment information",
      error
    );
  }
};

/**
 Post-Payment Logic:
Define logic to execute actions like updating property status or sending a confirmation email 
after a payment is completed.
 * */
// Confirm Payment and Post-Payment Logic
export const confirm_payment: RequestHandler<
  unknown,
  unknown,
  PaymentType,
  unknown
> = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      res
        .status(400)
        .json({ success: false, data: "Payment Intent ID is required" });
    }

    // Retrieve the Payment Intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      res.status(400).json({ success: false, data: "Payment not completed" });
    }

    // Update Payment Status in Database
    const payment = await Payment.findOneAndUpdate(
      { paymentIntentId },
      // { status: "succeeded", transactionId: paymentIntent.charges.data[0].id },
      { new: true }
    );

    if (!payment) {
      res.status(404).json({ success: false, data: "Payment not found" });
    }

    // Post-Payment Logic (e.g., Update Estate Status)
    // await Estate.findByIdAndUpdate(payment.propertyId, { availability: false });

    res
      .status(200)
      .json({ success: true, message: "Payment confirmed", data: payment });
  } catch (error) {
    console.error("Error confirming payment:", error);
    next(error);
  }
};
