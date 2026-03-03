"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "windeln";
  const sizeId = searchParams.get("size") || "t3";
  const [paymentMethod, setPaymentMethod] = useState("sepa");
  const [submitted, setSubmitted] = useState(false);

  const sizeLabels: Record<string, string> = {
    "t1plus": "Grosse 1+ (3-4 kg)",
    t2: "Grosse 2 (3-5 kg)",
    t3: "Grosse 3 (5-9 kg)",
    t4: "Grosse 4 (9-14 kg)",
    t5: "Grosse 5 (12-20 kg)",
    t6: "Grosse 6 (16-30 kg)",
    t7: "Grosse 7 (20-35 kg)",
    ht4: "Grosse 4 (9-14 kg)",
    ht5: "Grosse 5 (12-20 kg)",
    ht6: "Grosse 6 (16-30 kg)",
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-[800] mb-3">
            Vielen Dank fur Ihre Bestellung!
          </h1>
          <p className="text-grey-text mb-6">
            Dies ist eine Demo. In der echten Version wurden Sie jetzt eine
            Bestatigungsmail erhalten und Ihre Windeln in 72h geliefert
            bekommen.
          </p>
          <div className="bg-teal/5 border border-teal rounded-xl p-4 mb-6 text-sm text-left">
            <p className="font-bold text-teal mb-2">
              Was dieser POC demonstriert:
            </p>
            <ul className="space-y-1 text-grey-text">
              <li>&#10003; SEPA-Lastschrift Abo-Zahlung via Stripe</li>
              <li>&#10003; Deutsche Lieferadresse + DHL</li>
              <li>&#10003; Abonnement-Verwaltung im Kundenkonto</li>
              <li>&#10003; Kompletter deutscher Kaufprozess</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mein-konto"
              className="bg-lime text-white font-bold px-6 py-3 rounded-full hover:bg-lime-dark transition-colors uppercase text-sm"
            >
              Mein Konto ansehen
            </Link>
            <Link
              href="/"
              className="bg-grey-light text-gray-800 font-bold px-6 py-3 rounded-full hover:bg-grey-border transition-colors uppercase text-sm"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-[800] mb-8">Kasse</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column — Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery address */}
          <div className="border border-grey-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              Lieferadresse
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Vorname
                </label>
                <input
                  type="text"
                  placeholder="Anna"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nachname
                </label>
                <input
                  type="text"
                  placeholder="Muller"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Strasse und Hausnummer
                </label>
                <input
                  type="text"
                  placeholder="Musterstrasse 42"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PLZ</label>
                <input
                  type="text"
                  placeholder="10115"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stadt</label>
                <input
                  type="text"
                  placeholder="Berlin"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  placeholder="anna.muller@email.de"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  placeholder="+49 170 1234567"
                  className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm"
                />
              </div>
            </div>
            <div className="mt-4 bg-grey-light rounded-lg p-3 flex items-center gap-3 text-sm">
              <span className="text-xl">📦</span>
              <div>
                <p className="font-medium">Versand uber DHL</p>
                <p className="text-grey-text text-xs">
                  Lieferung an Hausstelle oder DHL Packstation — kostenlos
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border border-grey-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              Zahlungsmethode
            </h2>
            <div className="space-y-3">
              {/* SEPA */}
              <button
                onClick={() => setPaymentMethod("sepa")}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === "sepa"
                    ? "border-teal bg-teal/5"
                    : "border-grey-border hover:border-teal/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "sepa"
                          ? "border-teal"
                          : "border-grey-text"
                      }`}
                    >
                      {paymentMethod === "sepa" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-teal" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">SEPA-Lastschrift</p>
                      <p className="text-grey-text text-xs">
                        Direkt von Ihrem Bankkonto — am beliebtesten in
                        Deutschland
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-lime/20 text-teal-dark font-bold px-2 py-1 rounded-full">
                    Empfohlen
                  </span>
                </div>
                {paymentMethod === "sepa" && (
                  <div className="mt-4 ml-8">
                    <label className="block text-sm font-medium mb-1">
                      IBAN
                    </label>
                    <input
                      type="text"
                      placeholder="DE89 3704 0044 0532 0130 00"
                      className="w-full px-4 py-2.5 border border-grey-border rounded-lg focus:border-teal focus:outline-none text-sm font-mono"
                    />
                    <p className="text-xs text-grey-text mt-2">
                      Mit der Eingabe Ihrer IBAN erteilen Sie Les Petits
                      Culottes und Stripe ein SEPA-Lastschriftmandat.
                    </p>
                  </div>
                )}
              </button>

              {/* PayPal */}
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === "paypal"
                    ? "border-teal bg-teal/5"
                    : "border-grey-border hover:border-teal/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "paypal"
                        ? "border-teal"
                        : "border-grey-text"
                    }`}
                  >
                    {paymentMethod === "paypal" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-teal" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-grey-text text-xs">
                      Bezahlen mit Ihrem PayPal-Konto
                    </p>
                  </div>
                </div>
              </button>

              {/* Klarna */}
              <button
                onClick={() => setPaymentMethod("klarna")}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === "klarna"
                    ? "border-teal bg-teal/5"
                    : "border-grey-border hover:border-teal/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "klarna"
                        ? "border-teal"
                        : "border-grey-text"
                    }`}
                  >
                    {paymentMethod === "klarna" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-teal" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Klarna — Rechnung</p>
                    <p className="text-grey-text text-xs">
                      Erst erhalten, dann bezahlen (innerhalb von 30 Tagen)
                    </p>
                  </div>
                </div>
              </button>

              {/* Card */}
              <button
                onClick={() => setPaymentMethod("card")}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === "card"
                    ? "border-teal bg-teal/5"
                    : "border-grey-border hover:border-teal/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "card"
                        ? "border-teal"
                        : "border-grey-text"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-teal" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">Kreditkarte</p>
                    <p className="text-grey-text text-xs">
                      Visa, Mastercard, American Express
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Legal checkboxes */}
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>
                Ich akzeptiere die{" "}
                <Link href="/" className="text-teal underline">
                  AGB
                </Link>{" "}
                und die{" "}
                <Link href="/" className="text-teal underline">
                  Widerrufsbelehrung
                </Link>
                .
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>
                Ich habe die{" "}
                <Link href="/" className="text-teal underline">
                  Datenschutzerklarung
                </Link>{" "}
                gelesen und stimme der Verarbeitung meiner Daten zu.
              </span>
            </label>
          </div>
        </div>

        {/* Right column — Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-grey-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Bestellubersicht</h2>

            <div className="bg-grey-light rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👶</span>
                <div>
                  <p className="font-bold text-sm">
                    {type === "windeln" ? "Windeln" : "Hoschenwinden"} Abo
                  </p>
                  <p className="text-grey-text text-xs">
                    {sizeLabels[sizeId] || "Grosse 3 (5-9 kg)"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-grey-text">Abo-Preis</span>
                <span>49,00 EUR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-text">Versand (DHL)</span>
                <span className="text-teal font-medium">Kostenlos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grey-text">MwSt. (19%)</span>
                <span>inkl.</span>
              </div>
              <div className="border-t border-grey-border pt-2 flex justify-between font-bold text-lg">
                <span>Gesamt</span>
                <span className="text-teal">49,00 EUR</span>
              </div>
            </div>

            <p className="text-xs text-grey-text mb-4">
              Automatische Verlangung alle 4 Wochen. Jederzeit kundbar in Ihrem
              Kundenkonto.
            </p>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full bg-lime text-white font-bold py-4 rounded-full hover:bg-lime-dark transition-colors uppercase tracking-wide"
            >
              Zahlungspflichtig bestellen
            </button>

            <div className="mt-4 space-y-2 text-xs text-grey-text">
              <p className="flex items-center gap-1">
                <span className="text-teal">&#128274;</span> Sichere Zahlung uber Stripe
              </p>
              <p className="flex items-center gap-1">
                <span className="text-teal">&#10003;</span> 14 Tage
                Widerrufsrecht
              </p>
              <p className="flex items-center gap-1">
                <span className="text-teal">&#10003;</span> Kostenlose Retoure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KassePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-grey-text">
          Laden...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
