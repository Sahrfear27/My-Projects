import Stripe from "stripe";
import "dotenv/config";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: "test customer",
  };

  const customer: Stripe.Customer = await stripe.customers.create(params);

  console.log(customer.id);
};
createCustomer();
