"use client";

import Link from "next/link";
import { useState } from "react";

type ModalType = "size" | "frequency" | "pause" | "cancel" | null;

export default function MeinKontoPage() {
  const [modal, setModal] = useState<ModalType>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSize, setCurrentSize] = useState("Grosse 4 (9-14 kg)");
  const [currentFreq, setCurrentFreq] = useState("Alle 4 Wochen");

  const deliveries = [
    {
      date: "28. Feb. 2026",
      status: "Zugestellt",
      tracking: "DHL 00340434161723456789",
      color: "bg-lime/20 text-teal-dark",
    },
    {
      date: "31. Jan. 2026",
      status: "Zugestellt",
      tracking: "DHL 00340434161723456790",
      color: "bg-lime/20 text-teal-dark",
    },
    {
      date: "03. Jan. 2026",
      status: "Zugestellt",
      tracking: "DHL 00340434161723456791",
      color: "bg-lime/20 text-teal-dark",
    },
  ];

  return (
    <>
      <section className="bg-grey-light py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-[800]">Mein Konto</h1>
          <p className="text-grey-text mt-1">
            Willkommen zuruck, Anna! Hier verwalten Sie Ihr Windel-Abo.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Subscription card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active subscription */}
            <div
              className={`border-2 rounded-2xl p-6 ${isPaused ? "border-gold bg-gold/5" : "border-teal bg-teal/5"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                      isPaused
                        ? "bg-gold/20 text-gold"
                        : "bg-lime/20 text-teal-dark"
                    }`}
                  >
                    {isPaused ? "PAUSIERT" : "AKTIV"}
                  </span>
                  <h2 className="text-xl font-bold mt-2">Windel-Abo</h2>
                  <p className="text-grey-text text-sm">
                    Abo-Nr.: LPC-DE-2026-00042
                  </p>
                </div>
                <span className="text-4xl">👶</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-grey-text">Grosse</p>
                  <p className="font-bold text-sm">{currentSize}</p>
                </div>
                <div>
                  <p className="text-xs text-grey-text">Frequenz</p>
                  <p className="font-bold text-sm">{currentFreq}</p>
                </div>
                <div>
                  <p className="text-xs text-grey-text">Preis</p>
                  <p className="font-bold text-sm">49,00 EUR</p>
                </div>
                <div>
                  <p className="text-xs text-grey-text">Nachste Lieferung</p>
                  <p className="font-bold text-sm">
                    {isPaused ? "—" : "28. Marz 2026"}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setModal("size")}
                  className="bg-white border border-grey-border px-4 py-2 rounded-full text-sm font-medium hover:border-teal hover:text-teal transition-colors"
                >
                  Grosse andern
                </button>
                <button
                  onClick={() => setModal("frequency")}
                  className="bg-white border border-grey-border px-4 py-2 rounded-full text-sm font-medium hover:border-teal hover:text-teal transition-colors"
                >
                  Frequenz andern
                </button>
                <button
                  onClick={() => setModal("pause")}
                  className={`border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isPaused
                      ? "bg-lime text-white border-lime hover:bg-lime-dark"
                      : "bg-white border-grey-border hover:border-gold hover:text-gold"
                  }`}
                >
                  {isPaused ? "Abo fortsetzen" : "Abo pausieren"}
                </button>
                <button
                  onClick={() => setModal("cancel")}
                  className="bg-white border border-grey-border px-4 py-2 rounded-full text-sm font-medium hover:border-coral hover:text-coral transition-colors"
                >
                  Abo kundigen
                </button>
              </div>
            </div>

            {/* Delivery history */}
            <div className="border border-grey-border rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-4">Lieferhistorie</h2>
              <div className="space-y-3">
                {deliveries.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-grey-light rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📦</span>
                      <div>
                        <p className="font-medium text-sm">{d.date}</p>
                        <p className="text-grey-text text-xs">{d.tracking}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${d.color}`}
                    >
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment info */}
            <div className="border border-grey-border rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-4">Zahlungsmethode</h2>
              <div className="flex items-center justify-between bg-grey-light rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏦</span>
                  <div>
                    <p className="font-medium text-sm">SEPA-Lastschrift</p>
                    <p className="text-grey-text text-xs font-mono">
                      DE89 •••• •••• •••• ••30 00
                    </p>
                  </div>
                </div>
                <button className="text-teal text-sm font-medium hover:text-teal-dark">
                  Andern
                </button>
              </div>
            </div>
          </div>

          {/* Right — Account info */}
          <div className="space-y-6">
            {/* Profile */}
            <div className="border border-grey-border rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-4">Meine Daten</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-grey-text text-xs">Name</p>
                  <p className="font-medium">Anna Muller</p>
                </div>
                <div>
                  <p className="text-grey-text text-xs">E-Mail</p>
                  <p className="font-medium">anna.muller@email.de</p>
                </div>
                <div>
                  <p className="text-grey-text text-xs">Lieferadresse</p>
                  <p className="font-medium">
                    Musterstrasse 42
                    <br />
                    10115 Berlin
                  </p>
                </div>
              </div>
              <button className="mt-4 text-teal text-sm font-medium hover:text-teal-dark">
                Adresse andern
              </button>
            </div>

            {/* Quick help */}
            <div className="bg-teal text-white rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-3">Brauchen Sie Hilfe?</h2>
              <p className="text-sm opacity-90 mb-4">
                Unser Kundenservice ist 7 Tage die Woche fur Sie da.
              </p>
              <button className="bg-white text-teal font-bold px-4 py-2 rounded-full text-sm hover:bg-grey-light transition-colors w-full">
                Kontakt aufnehmen
              </button>
            </div>

            {/* Demo info */}
            <div className="bg-coral/10 border border-coral/30 rounded-2xl p-6">
              <p className="font-bold text-sm text-coral mb-2">
                POC Demo
              </p>
              <p className="text-xs text-grey-text">
                Dieses Kundenkonto zeigt, wie deutsche Abonnenten ihr Abo
                selbst verwalten konnen: Grosse andern, Frequenz anpassen,
                pausieren oder kundigen — alles mit einem Klick.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            {modal === "size" && (
              <>
                <h3 className="font-bold text-lg mb-4">Grosse andern</h3>
                <div className="space-y-2 mb-4">
                  {[
                    "Grosse 3 (5-9 kg)",
                    "Grosse 4 (9-14 kg)",
                    "Grosse 5 (12-20 kg)",
                    "Grosse 6 (16-30 kg)",
                    "Grosse 7 (20-35 kg)",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setCurrentSize(s);
                        setModal(null);
                      }}
                      className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${
                        currentSize === s
                          ? "border-teal bg-teal/5 font-bold"
                          : "border-grey-border hover:border-teal/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-grey-text">
                  Die Anderung gilt ab der nachsten Lieferung.
                </p>
              </>
            )}
            {modal === "frequency" && (
              <>
                <h3 className="font-bold text-lg mb-4">Frequenz andern</h3>
                <div className="space-y-2 mb-4">
                  {[
                    "Alle 2 Wochen",
                    "Alle 3 Wochen",
                    "Alle 4 Wochen",
                    "Alle 5 Wochen",
                    "Alle 6 Wochen",
                  ].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setCurrentFreq(f);
                        setModal(null);
                      }}
                      className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${
                        currentFreq === f
                          ? "border-teal bg-teal/5 font-bold"
                          : "border-grey-border hover:border-teal/50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </>
            )}
            {modal === "pause" && (
              <>
                <h3 className="font-bold text-lg mb-3">
                  {isPaused ? "Abo fortsetzen?" : "Abo pausieren?"}
                </h3>
                <p className="text-grey-text text-sm mb-4">
                  {isPaused
                    ? "Ihre nachste Lieferung wird wie geplant versendet."
                    : "Ihr Abo wird pausiert. Keine weiteren Lieferungen oder Zahlungen bis zur Reaktivierung."}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsPaused(!isPaused);
                      setModal(null);
                    }}
                    className={`flex-grow py-3 rounded-full font-bold text-sm ${
                      isPaused
                        ? "bg-lime text-white"
                        : "bg-gold text-white"
                    }`}
                  >
                    {isPaused ? "Ja, fortsetzen" : "Ja, pausieren"}
                  </button>
                  <button
                    onClick={() => setModal(null)}
                    className="flex-grow py-3 rounded-full font-bold text-sm border border-grey-border"
                  >
                    Abbrechen
                  </button>
                </div>
              </>
            )}
            {modal === "cancel" && (
              <>
                <h3 className="font-bold text-lg mb-3">Abo kundigen?</h3>
                <p className="text-grey-text text-sm mb-4">
                  Sind Sie sicher? Sie konnen Ihr Abo jederzeit wieder
                  aktivieren. Die Kundigung wird sofort wirksam.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(null)}
                    className="flex-grow py-3 rounded-full font-bold text-sm bg-lime text-white"
                  >
                    Abo behalten
                  </button>
                  <button
                    onClick={() => setModal(null)}
                    className="flex-grow py-3 rounded-full font-bold text-sm border border-coral text-coral"
                  >
                    Trotzdem kundigen
                  </button>
                </div>
              </>
            )}
            <button
              onClick={() => setModal(null)}
              className="mt-4 text-grey-text text-sm hover:text-black w-full text-center"
            >
              Schliessen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
