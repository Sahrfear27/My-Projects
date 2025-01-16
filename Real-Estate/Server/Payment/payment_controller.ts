import { RequestHandler } from "express";
import Stripe from "stripe";
import { StandardResponse } from "../Helper/standardResponse";
import { PaymentType } from "./payment_model";
import { Payment } from "./payment_model";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const make_payment: RequestHandler<
  { property_id: string },
  StandardResponse<PaymentType>,
  PaymentType,
  unknown
> = async (req, res, next) => {
  try {
    console.log("Here");
    const { property_id } = req.params;
    const { tokenData } = req;

    const { amount, currency } = req.body;
    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency, // e.g., 'usd'
      // metadata: {
      //   userId,
      // },
    });

    // Save the payment details into the database
    const payment = {
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: "pending", // Initially set to pending until Stripe confirms
      propertyId: property_id,
      userId: tokenData._id,
    };
    const newPayment = await Payment.create(payment);

    res.json({ success: true, data: newPayment });
  } catch (error) {
    console.error("Error while making payment:", error);
    next(error);
  }
};

// import { RequestHandler } from "express";
// import Stripe from "stripe";
// import { StandardResponse } from "../Helper/standardResponse";
// import { PaymentType } from "./payment_model";
// import { Payment } from "./payment_model";
// import mongoose from "mongoose";

// // Initialize Stripe with secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2020-08-27' });

// export const make_payment: RequestHandler<
//   { property_id: string },
//   StandardResponse<PaymentType>,
//   PaymentType,
//   unknown
// > = async (req, res, next) => {
//   try {
//     console.log("Making Payment...");

//     // Extract the property_id from request parameters and other payment details from request body
//     const { property_id } = req.params;  // This is the property ID from the URL
//     const { tokenData } = req;  // Assuming tokenData contains the authenticated user's info
//     const { amount, currency, propertyId, userId } = req.body;

//     // Log the request body for debugging purposes
//     console.log("Request body:", req.body);

//     // Validate the propertyId and userId from the body are not undefined
//     if (!propertyId || !userId) {
//       return res.status(400).json({ success: false, message: "propertyId and userId are required." });
//     }

//     // The property_id from params should be used to associate with the payment, overriding propertyId from the body
//     if (property_id !== propertyId) {
//       return res.status(400).json({ success: false, message: "Property ID mismatch." });
//     }

//     // Create a Payment Intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency, // e.g., 'usd'
//       metadata: {
//         propertyId: property_id, // Using the property_id from the URL params
//         userId,
//       },
//     });

//     // Prepare the payment object to be stored in the database
//     const payment = {
//       amount,
//       currency,
//       paymentIntentId: paymentIntent.id,
//       status: "pending", // Initially set to pending until Stripe confirms
//       propertyId: mongoose.Types.ObjectId(property_id), // Ensure it's an ObjectId
//       userId: mongoose.Types.ObjectId(userId), // Ensure it's an ObjectId
//     };

//     // Save the payment details into the database
//     const newPayment = await Payment.create(payment);

//     // Respond with the created payment object
//     res.json({ success: true, data: newPayment });
//   } catch (error) {
//     console.error("Error while making payment:", error);
//     next(error);
//   }
// };
