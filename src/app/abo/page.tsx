"use client";

import Link from "next/link";
import { useState } from "react";

type SubType = "windeln" | "hoeschen";

interface Size {
  id: string;
  label: string;
  weight: string;
  count: number;
  pricePerUnit: number;
  total: number;
  animal: string;
}

const sizes: Record<SubType, Size[]> = {
  windeln: [
    { id: "t1plus", label: "Grosse 1+", weight: "3-4 kg", count: 232, pricePerUnit: 0.21, total: 49, animal: "🐣" },
    { id: "t2", label: "Grosse 2", weight: "3-5 kg", count: 224, pricePerUnit: 0.22, total: 49, animal: "🐰" },
    { id: "t3", label: "Grosse 3", weight: "5-9 kg", count: 162, pricePerUnit: 0.30, total: 49, animal: "🦊" },
    { id: "t4", label: "Grosse 4", weight: "9-14 kg", count: 144, pricePerUnit: 0.34, total: 49, animal: "🐨" },
    { id: "t5", label: "Grosse 5", weight: "12-20 kg", count: 120, pricePerUnit: 0.41, total: 49, animal: "🦁" },
    { id: "t6", label: "Grosse 6", weight: "16-30 kg", count: 108, pricePerUnit: 0.46, total: 49, animal: "🐘" },
    { id: "t7", label: "Grosse 7", weight: "20-35 kg", count: 102, pricePerUnit: 0.48, total: 49, animal: "🦒" },
  ],
  hoeschen: [
    { id: "ht4", label: "Grosse 4", weight: "9-14 kg", count: 132, pricePerUnit: 0.37, total: 49, animal: "🐨" },
    { id: "ht5", label: "Grosse 5", weight: "12-20 kg", count: 108, pricePerUnit: 0.45, total: 49, animal: "🦁" },
    { id: "ht6", label: "Grosse 6", weight: "16-30 kg", count: 96, pricePerUnit: 0.51, total: 49, animal: "🐘" },
  ],
};

const faq = [
  {
    q: "Was ist das Windel-Abo von Les Petits Culottes?",
    a: "Unser Abo liefert Ihnen regelmaszig hochwertige, in Frankreich hergestellte Windeln direkt nach Hause. Sie wahlen die Grosse und die Lieferfrequenz — wir kummern uns um den Rest.",
  },
  {
    q: "Wie funktioniert das Abo?",
    a: "Wahlen Sie Ihren Windeltyp und die Grosse. Wir liefern automatisch in der von Ihnen gewahlten Frequenz. Sie konnen jederzeit in Ihrem Kundenkonto die Grosse andern, pausieren oder kundigen.",
  },
  {
    q: "Welche Vorteile hat ein Abo?",
    a: "Kein Einkaufsstress mehr, faire Preise dank kurzer Lieferkette, kostenlose Lieferung, kostenlose Retoure und jederzeit kundbar. Ausserdem sparen Sie bis zu 10% gegenuber dem Einzelkauf.",
  },
  {
    q: "Kann ich die Grosse wahrend des Abos andern?",
    a: "Ja, jederzeit! In Ihrem Kundenkonto konnen Sie die Grosse mit einem Klick andern. Die neue Grosse gilt ab der nachsten Lieferung.",
  },
  {
    q: "Wie kann ich mein Abo kundigen?",
    a: "Ganz einfach in Ihrem Kundenkonto unter 'Mein Abo' — mit einem Klick, ohne Angabe von Grunden, ohne Kundigungsfrist. Wir bitten nur um eine Kundigung vor dem nachsten Versanddatum.",
  },
  {
    q: "Wie wird bezahlt?",
    a: "Per SEPA-Lastschrift, PayPal, Kreditkarte oder Klarna. Die Zahlung erfolgt automatisch vor jeder Lieferung.",
  },
  {
    q: "Wie schnell wird geliefert?",
    a: "Innerhalb von 72 Stunden nach Versand. Wir versenden uber DHL mit Sendungsverfolgung. Lieferung an die Hausstelle oder an DHL Packstationen moglich.",
  },
];

export default function AboPage() {
  const [subType, setSubType] = useState<SubType>("windeln");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentSizes = sizes[subType];
  const selected = currentSizes.find((s) => s.id === selectedSize);

  return (
    <>
      {/* Header */}
      <section className="bg-grey-light py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl mb-3">Windeln im Abo</h1>
          <p className="text-grey-text text-lg">
            Wahlen Sie Ihren Windeltyp und die passende Grosse. Ab 49 EUR pro
            Lieferung, jederzeit kundbar.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Step 1: Type selector */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">
              1
            </span>
            Windeltyp wahlen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setSubType("windeln");
                setSelectedSize(null);
              }}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                subType === "windeln"
                  ? "border-teal bg-teal/5 shadow-md"
                  : "border-grey-border hover:border-teal/50"
              }`}
            >
              <div className="text-3xl mb-2">👶</div>
              <h3 className="font-bold text-lg">Windeln</h3>
              <p className="text-grey-text text-sm">
                Klassische Windeln — Grosse 1+ bis 7
              </p>
              <p className="text-teal font-bold mt-2">49 EUR / Lieferung</p>
            </button>
            <button
              onClick={() => {
                setSubType("hoeschen");
                setSelectedSize(null);
              }}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                subType === "hoeschen"
                  ? "border-teal bg-teal/5 shadow-md"
                  : "border-grey-border hover:border-teal/50"
              }`}
            >
              <div className="text-3xl mb-2">🩲</div>
              <h3 className="font-bold text-lg">Hoschenwinden</h3>
              <p className="text-grey-text text-sm">
                Zum Hochziehen — Grosse 4 bis 6
              </p>
              <p className="text-teal font-bold mt-2">49 EUR / Lieferung</p>
            </button>
          </div>
        </div>

        {/* Step 2: Size selector */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">
              2
            </span>
            Grosse wahlen
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedSize === size.id
                    ? "border-teal bg-teal/5 shadow-md"
                    : "border-grey-border hover:border-teal/50"
                }`}
              >
                <div className="text-3xl mb-1">{size.animal}</div>
                <h3 className="font-bold text-sm">{size.label}</h3>
                <p className="text-grey-text text-xs">{size.weight}</p>
                <p className="text-xs mt-1">
                  {size.count} Stuck
                </p>
                <p className="text-teal font-bold text-sm mt-1">
                  {size.pricePerUnit.toFixed(2)} EUR/St.
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Summary + CTA */}
        {selected && (
          <div className="bg-teal/5 border-2 border-teal rounded-2xl p-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">
                  Ihre Auswahl: {subType === "windeln" ? "Windeln" : "Hoschenwinden"}{" "}
                  — {selected.label}
                </h3>
                <p className="text-grey-text text-sm mt-1">
                  {selected.count} Windeln pro Lieferung ({selected.weight}) —{" "}
                  {selected.pricePerUnit.toFixed(2)} EUR/Stuck
                </p>
                <div className="flex gap-4 mt-3 text-xs text-grey-text">
                  <span className="flex items-center gap-1">
                    <span className="text-teal">&#10003;</span> Kostenlose Lieferung
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-teal">&#10003;</span> Jederzeit kundbar
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-teal">&#10003;</span> Kostenlose Retoure
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-[800] text-teal">
                  {selected.total} EUR
                </div>
                <div className="text-xs text-grey-text">pro Lieferung</div>
                <Link
                  href={`/kasse?type=${subType}&size=${selected.id}`}
                  className="inline-block bg-lime text-white font-bold px-8 py-3 rounded-full mt-3 hover:bg-lime-dark transition-colors uppercase text-sm"
                >
                  Jetzt bestellen
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-grey-light rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">🌿</div>
            <h3 className="font-bold text-sm mb-1">Naturliches Innenvlies</h3>
            <p className="text-grey-text text-xs">
              Hautfreundlich, ohne Chlor und Parfum
            </p>
          </div>
          <div className="bg-grey-light rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-bold text-sm mb-1">Hochste Klassifizierung</h3>
            <p className="text-grey-text text-xs">
              Klasse A bei unabhangigen Absorptionstests
            </p>
          </div>
          <div className="bg-grey-light rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">🚛</div>
            <h3 className="font-bold text-sm mb-1">Kurze Lieferkette</h3>
            <p className="text-grey-text text-xs">
              Faire Preise dank Direktvertrieb
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-[800] text-center mb-8">
            Haufig gestellte Fragen
          </h2>
          <div className="max-w-3xl mx-auto space-y-2">
            {faq.map((item, i) => (
              <div
                key={i}
                className="border border-grey-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-medium hover:bg-grey-light transition-colors"
                >
                  <span>{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-grey-text flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-grey-text text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-teal text-white rounded-2xl p-8 text-center">
          <h2 className="text-xl font-[800] mb-3">
            Volle Transparenz
          </h2>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto text-sm">
            Wir veroffentlichen alle unsere Analysen: toxikologische Tests,
            Zusammensetzung, Absorptionsergebnisse. Vertrauen beginnt mit
            Transparenz.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-medium">
              Toxikologische Analyse (PDF)
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-medium">
              Absorptionsergebnisse (PDF)
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-xs font-medium">
              Zusammensetzung
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
