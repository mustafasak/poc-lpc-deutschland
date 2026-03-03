"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { img, sizeImages } from "@/lib/images";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "windeln";
  const sizeId = searchParams.get("size") || "t3";
  const [paymentMethod, setPaymentMethod] = useState("sepa");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const sizeLabels: Record<string, string> = {
    t1plus: "Grosse 1+ (3-4 kg)", t2: "Grosse 2 (3-5 kg)", t3: "Grosse 3 (5-9 kg)",
    t4: "Grosse 4 (9-14 kg)", t5: "Grosse 5 (12-20 kg)", t6: "Grosse 6 (16-30 kg)",
    t7: "Grosse 7 (20-35 kg)", ht4: "Grosse 4 (9-14 kg)", ht5: "Grosse 5 (12-20 kg)",
    ht6: "Grosse 6 (16-30 kg)",
  };

  const sizeImg = sizeImages[sizeId];

  const handleCheckout = async () => {
    if (!email || !firstName || !lastName) {
      setError("Bitte fullen Sie alle Pflichtfelder aus.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`,
          paymentMethod,
          sizeId,
          subType: type,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-[800] mb-8">Kasse</h1>

      {error && (
        <div className="bg-coral/10 border border-coral text-coral rounded-xl p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery address */}
          <div className="border border-grey-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold">1</span>
              Lieferadresse
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vorname *</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Anna" className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nachname *</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Muller" className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Strasse und Hausnummer</label>
                <input type="text" placeholder="Musterstrasse 42" className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PLZ</label>
                <input type="text" placeholder="10115" className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stadt</label>
                <input type="text" placeholder="Berlin" className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">E-Mail-Adresse *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="anna.muller@email.de" className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm" />
              </div>
            </div>
            <div className="mt-4 bg-grey-light rounded-lg p-3 flex items-center gap-3 text-sm">
              <span className="text-xl">📦</span>
              <div>
                <p className="font-medium">Versand uber DHL</p>
                <p className="text-grey-text text-xs">Lieferung an Hausstelle oder DHL Packstation — kostenlos</p>
              </div>
            </div>
          </div>

          {/* Payment method selector */}
          <div className="border border-grey-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold">2</span>
              Zahlungsmethode
            </h2>
            <p className="text-grey-text text-sm mb-4">
              Sie werden zu Stripe weitergeleitet, um die Zahlung sicher abzuschliessen.
            </p>
            <div className="space-y-3">
              {[
                { id: "sepa", label: "SEPA-Lastschrift", desc: "Direkt von Ihrem Bankkonto — am beliebtesten in Deutschland", badge: "Empfohlen" },
                { id: "card", label: "Kreditkarte", desc: "Visa, Mastercard, American Express", badge: null },
              ].map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === pm.id ? "border-teal bg-teal/5" : "border-grey-border hover:border-teal/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === pm.id ? "border-teal" : "border-grey-text"}`}>
                        {paymentMethod === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-teal" />}
                      </div>
                      <div>
                        <p className="font-medium">{pm.label}</p>
                        <p className="text-grey-text text-xs">{pm.desc}</p>
                      </div>
                    </div>
                    {pm.badge && <span className="text-xs bg-lime/20 text-teal-dark font-bold px-2 py-1 rounded-full">{pm.badge}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Ich akzeptiere die <Link href="/" className="text-teal underline">AGB</Link> und die <Link href="/" className="text-teal underline">Widerrufsbelehrung</Link>.</span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Ich habe die <Link href="/" className="text-teal underline">Datenschutzerklarung</Link> gelesen.</span>
            </label>
          </div>
        </div>

        {/* Right column — Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-grey-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Bestellubersicht</h2>
            <div className="bg-grey-light rounded-xl p-4 mb-4 flex items-center gap-3">
              {sizeImg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sizeImg.hover} alt="" className="h-12 flex-shrink-0" />
              )}
              <div>
                <p className="font-bold text-sm">{type === "windeln" ? "Windeln" : "Hoschenwinden"} Abo</p>
                <p className="text-grey-text text-xs">{sizeLabels[sizeId] || "Grosse 3 (5-9 kg)"}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-grey-text">Abo-Preis</span><span>49,00 EUR</span></div>
              <div className="flex justify-between"><span className="text-grey-text">Versand (DHL)</span><span className="text-teal font-medium">Kostenlos</span></div>
              <div className="flex justify-between"><span className="text-grey-text">MwSt. (19%)</span><span>inkl.</span></div>
              <div className="border-t border-grey-border pt-2 flex justify-between font-bold text-lg">
                <span>Gesamt</span><span className="text-teal">49,00 EUR</span>
              </div>
            </div>
            <p className="text-xs text-grey-text mb-4">Automatische Verlangung alle 4 Wochen. Jederzeit kundbar.</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-lime text-white font-bold py-4 rounded-full hover:bg-lime-dark transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Weiterleitung zu Stripe..." : "Zahlungspflichtig bestellen"}
            </button>
            <div className="mt-4 space-y-2 text-xs text-grey-text">
              <p className="flex items-center gap-1">&#128274; Sichere Zahlung uber Stripe</p>
              <p className="flex items-center gap-1"><span className="text-teal">&#10003;</span> 14 Tage Widerrufsrecht</p>
              <p className="flex items-center gap-1"><span className="text-teal">&#10003;</span> Kostenlose Retoure</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.prodAboCouches} alt="Windel-Abo" className="w-full mt-4 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KassePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-grey-text">Laden...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
