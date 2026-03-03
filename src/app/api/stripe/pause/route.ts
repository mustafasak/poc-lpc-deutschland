import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId } = await req.json();

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      pause_collection: { behavior: "void" },
    });

    return NextResponse.json({ status: subscription.status, paused: true });
  } catch (error) {
    console.error("Pause error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
