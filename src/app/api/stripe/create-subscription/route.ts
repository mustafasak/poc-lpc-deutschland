import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Product prices for each size (in cents)
const PRICE_AMOUNT = 4900; // 49.00 EUR

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, paymentMethod, sizeId, subType } = body;

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

    if (paymentMethod === "sepa") {
      // Create a Checkout Session with SEPA Direct Debit
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ["sepa_debit"],
        mode: "subscription",
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mein-konto?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/kasse?type=${subType}&size=${sizeId}&canceled=true`,
        subscription_data: {
          metadata: { sizeId, subType, market: "DE" },
        },
        locale: "de",
      });

      return NextResponse.json({ url: session.url, sessionId: session.id });
    }

    // For card/PayPal/Klarna — use Checkout Session with automatic payment methods
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/mein-konto?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/kasse?type=${subType}&size=${sizeId}&canceled=true`,
      subscription_data: {
        metadata: { sizeId, subType, market: "DE" },
      },
      locale: "de",
      ...(paymentMethod === "card" && { payment_method_types: ["card"] }),
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
