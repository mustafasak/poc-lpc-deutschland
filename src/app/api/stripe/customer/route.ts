import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const sessionId = searchParams.get("session_id");

    let customerId: string | undefined;

    if (sessionId) {
      // Look up customer from checkout session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      customerId = session.customer as string;
    } else if (email) {
      // Look up customer by email
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length === 0) {
        return NextResponse.json({ customer: null, subscriptions: [] });
      }
      customerId = customers.data[0].id;
    } else {
      return NextResponse.json({ error: "email or session_id required" }, { status: 400 });
    }

    if (!customerId) {
      return NextResponse.json({ customer: null, subscriptions: [] });
    }

    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) {
      return NextResponse.json({ customer: null, subscriptions: [] });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 10,
      expand: ["data.default_payment_method"],
    });

    return NextResponse.json({
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
      subscriptions: subscriptions.data,
    });
  } catch (error) {
    console.error("Customer lookup error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
