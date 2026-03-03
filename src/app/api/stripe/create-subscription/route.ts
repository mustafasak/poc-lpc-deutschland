import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_AMOUNT = 4900; // 49.00 EUR
const PAYMENT_METHOD_CONFIG = "pmc_1RKHubRo6ty8dxzTNW0IF7bw";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, sizeId, subType } = body;

    // Create or retrieve customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name,
        metadata: { sizeId, subType, market: "DE" },
      });
    }

    // Create a price for the subscription
    const price = await stripe.prices.create({
      unit_amount: PRICE_AMOUNT,
      currency: "eur",
      recurring: { interval: "month" },
      product_data: {
        name: `Windel-Abo ${subType === "hoeschen" ? "Höschenwinden" : "Windeln"} - ${sizeId}`,
        metadata: { sizeId, subType },
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${baseUrl}/mein-konto?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}/kasse?type=${subType}&size=${sizeId}&canceled=true`,
      subscription_data: {
        metadata: { sizeId, subType, market: "DE" },
      },
      locale: "de",
      payment_method_configuration: PAYMENT_METHOD_CONFIG,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
