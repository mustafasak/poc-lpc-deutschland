"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { img } from "@/lib/images";

interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  pause_collection: { behavior: string } | null;
  items: { data: Array<{ price: { unit_amount: number; recurring: { interval: string } }; id: string }> };
  metadata: { sizeId?: string; subType?: string };
}

interface CustomerData {
  customer: { id: string; name: string; email: string };
  subscriptions: Subscription[];
}

function MeinKontoContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");

  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [lookupDone, setLookupDone] = useState(false);

  const lookupCustomer = useCallback(async (lookupEmail: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stripe/customer?email=${encodeURIComponent(lookupEmail)}`);
      const data = await res.json();
      if (data.customer) {
        setCustomerData(data);
      } else {
        setCustomerData(null);
      }
    } catch {
      setCustomerData(null);
    }
    setLoading(false);
    setLookupDone(true);
  }, []);

  // If coming back from Stripe checkout, look up by session
  useEffect(() => {
    if (success === "true" && sessionId) {
      fetch(`/api/stripe/customer?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.customer) {
            setCustomerData(data);
            setEmail(data.customer.email);
            setLookupDone(true);
          }
        });
    }
  }, [success, sessionId]);

  const handlePause = async (subId: string) => {
    setActionLoading("pause");
    await fetch("/api/stripe/pause", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId: subId }),
    });
    if (email) await lookupCustomer(email);
    setActionLoading(null);
  };

  const handleResume = async (subId: string) => {
    setActionLoading("resume");
    await fetch("/api/stripe/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId: subId }),
    });
    if (email) await lookupCustomer(email);
    setActionLoading(null);
  };

  const handleCancel = async (subId: string) => {
    if (!confirm("Sind Sie sicher, dass Sie Ihr Abo kundigen mochten?")) return;
    setActionLoading("cancel");
    await fetch("/api/stripe/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId: subId }),
    });
    if (email) await lookupCustomer(email);
    setActionLoading(null);
  };

  const handleManagePortal = async (customerId: string) => {
    setActionLoading("portal");
    const res = await fetch("/api/stripe/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setActionLoading(null);
  };

  const formatDate = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" });

  const getStatusBadge = (sub: Subscription) => {
    if (sub.status === "canceled") return { label: "GEKUNDIGT", color: "bg-coral/20 text-coral" };
    if (sub.pause_collection) return { label: "PAUSIERT", color: "bg-gold/20 text-gold" };
    if (sub.status === "active") return { label: "AKTIV", color: "bg-lime/20 text-teal-dark" };
    if (sub.status === "trialing") return { label: "TESTPHASE", color: "bg-lime/20 text-teal-dark" };
    return { label: sub.status.toUpperCase(), color: "bg-grey-light text-grey-text" };
  };

  return (
    <>
      <section className="bg-grey-light py-8">
        <div className="max-w-5xl mx-auto px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.logo} alt="LPC" className="h-10 mb-4" />
          <h1 className="text-2xl md:text-3xl font-[800]">Mein Konto</h1>
          <p className="text-grey-text mt-1">
            Verwalten Sie Ihr Windel-Abo — Grosse andern, pausieren oder kundigen.
          </p>
        </div>
      </section>

      {success === "true" && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="bg-lime/10 border border-lime text-teal-dark rounded-xl p-4 text-sm">
            Vielen Dank! Ihr Abo wurde erfolgreich erstellt. Sie erhalten eine Bestatigungsmail von Stripe.
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Email lookup */}
        {!customerData && !loading && (
          <div className="max-w-md mx-auto text-center py-12">
            <h2 className="text-xl font-bold mb-4">Abo nachschlagen</h2>
            <p className="text-grey-text text-sm mb-6">
              Geben Sie die E-Mail-Adresse ein, mit der Sie Ihr Abo erstellt haben.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anna.muller@email.de"
                className="flex-grow px-4 py-3 border border-grey-border rounded-full focus:border-teal focus:outline-none text-sm"
                onKeyDown={(e) => e.key === "Enter" && lookupCustomer(email)}
              />
              <button
                onClick={() => lookupCustomer(email)}
                className="bg-teal text-white font-bold px-6 py-3 rounded-full hover:bg-teal-dark transition-colors text-sm"
              >
                Suchen
              </button>
            </div>
            {lookupDone && !customerData && (
              <p className="text-coral text-sm mt-4">
                Kein Abo mit dieser E-Mail gefunden. <Link href="/abo" className="underline text-teal">Jetzt abonnieren</Link>
              </p>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-grey-text">Laden...</div>
        )}

        {/* Customer dashboard */}
        {customerData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {customerData.subscriptions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-grey-text mb-4">Keine aktiven Abos gefunden.</p>
                  <Link href="/abo" className="bg-lime text-white font-bold px-6 py-3 rounded-full">Jetzt abonnieren</Link>
                </div>
              ) : (
                customerData.subscriptions.map((sub) => {
                  const badge = getStatusBadge(sub);
                  const isPaused = !!sub.pause_collection;
                  const isCanceled = sub.status === "canceled";

                  return (
                    <div key={sub.id} className={`border-2 rounded-2xl p-6 ${isCanceled ? "border-coral/30 bg-coral/5" : isPaused ? "border-gold bg-gold/5" : "border-teal bg-teal/5"}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${badge.color}`}>{badge.label}</span>
                          <h2 className="text-xl font-bold mt-2">
                            {sub.metadata.subType === "hoeschen" ? "Hoschenwinden" : "Windeln"} Abo
                          </h2>
                          <p className="text-grey-text text-xs mt-1">Abo-ID: {sub.id.slice(0, 20)}...</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.prodAboCouches} alt="" className="h-16 rounded-lg" />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-xs text-grey-text">Grosse</p>
                          <p className="font-bold text-sm">{sub.metadata.sizeId || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-grey-text">Preis</p>
                          <p className="font-bold text-sm">{(sub.items.data[0]?.price.unit_amount / 100).toFixed(2)} EUR</p>
                        </div>
                        <div>
                          <p className="text-xs text-grey-text">Nachste Verlangung</p>
                          <p className="font-bold text-sm">{isCanceled ? "—" : formatDate(sub.current_period_end)}</p>
                        </div>
                      </div>

                      {!isCanceled && (
                        <div className="flex flex-wrap gap-2">
                          {isPaused ? (
                            <button
                              onClick={() => handleResume(sub.id)}
                              disabled={actionLoading === "resume"}
                              className="bg-lime text-white border border-lime px-4 py-2 rounded-full text-sm font-medium hover:bg-lime-dark transition-colors disabled:opacity-50"
                            >
                              {actionLoading === "resume" ? "..." : "Abo fortsetzen"}
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePause(sub.id)}
                              disabled={actionLoading === "pause"}
                              className="bg-white border border-grey-border px-4 py-2 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors disabled:opacity-50"
                            >
                              {actionLoading === "pause" ? "..." : "Abo pausieren"}
                            </button>
                          )}
                          <button
                            onClick={() => handleCancel(sub.id)}
                            disabled={actionLoading === "cancel"}
                            className="bg-white border border-grey-border px-4 py-2 rounded-full text-sm font-medium hover:border-coral hover:text-coral transition-colors disabled:opacity-50"
                          >
                            {actionLoading === "cancel" ? "..." : "Abo kundigen"}
                          </button>
                          <button
                            onClick={() => handleManagePortal(customerData.customer.id)}
                            disabled={actionLoading === "portal"}
                            className="bg-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-dark transition-colors disabled:opacity-50"
                          >
                            {actionLoading === "portal" ? "..." : "Stripe Portal offnen"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="border border-grey-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4">Meine Daten</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-grey-text text-xs">Name</p>
                    <p className="font-medium">{customerData.customer.name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-grey-text text-xs">E-Mail</p>
                    <p className="font-medium">{customerData.customer.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-teal text-white rounded-2xl p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.avatars} alt="" className="h-10 mb-3 brightness-0 invert" />
                <h2 className="font-bold text-lg mb-3">Brauchen Sie Hilfe?</h2>
                <p className="text-sm opacity-90 mb-4">Unser Kundenservice ist 7 Tage die Woche fur Sie da.</p>
                <button className="bg-white text-teal font-bold px-4 py-2 rounded-full text-sm hover:bg-grey-light transition-colors w-full">
                  Kontakt aufnehmen
                </button>
              </div>

              <div className="bg-grey-light rounded-2xl p-6">
                <p className="font-bold text-sm mb-2">E2E Test-Infos</p>
                <ul className="text-xs text-grey-text space-y-1">
                  <li>&#10003; Echte Stripe-Abos (Testmodus)</li>
                  <li>&#10003; SEPA-Lastschrift funktioniert</li>
                  <li>&#10003; Pausieren / Fortsetzen / Kundigen</li>
                  <li>&#10003; Stripe Customer Portal</li>
                  <li>&#10003; IBAN Testdaten: DE89370400440532013000</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function MeinKontoPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-grey-text">Laden...</div>}>
      <MeinKontoContent />
    </Suspense>
  );
}
