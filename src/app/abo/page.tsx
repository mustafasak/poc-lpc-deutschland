"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { img, sizeImages } from "@/lib/images";

type SubType = "windeln" | "hoeschen";

interface Size {
  id: string;
  label: string;
  weight: string;
  count: number;
  pricePerUnit: number;
  total: number;
}

const sizes: Record<SubType, Size[]> = {
  windeln: [
    { id: "t1plus", label: "Grosse 1+", weight: "3-4 kg", count: 232, pricePerUnit: 0.21, total: 49 },
    { id: "t2", label: "Grosse 2", weight: "3-5 kg", count: 224, pricePerUnit: 0.22, total: 49 },
    { id: "t3", label: "Grosse 3", weight: "5-9 kg", count: 162, pricePerUnit: 0.30, total: 49 },
    { id: "t4", label: "Grosse 4", weight: "9-14 kg", count: 144, pricePerUnit: 0.34, total: 49 },
    { id: "t5", label: "Grosse 5", weight: "12-20 kg", count: 120, pricePerUnit: 0.41, total: 49 },
    { id: "t6", label: "Grosse 6", weight: "16-30 kg", count: 108, pricePerUnit: 0.46, total: 49 },
    { id: "t7", label: "Grosse 7", weight: "20-35 kg", count: 102, pricePerUnit: 0.48, total: 49 },
  ],
  hoeschen: [
    { id: "ht4", label: "Grosse 4", weight: "9-14 kg", count: 132, pricePerUnit: 0.37, total: 49 },
    { id: "ht5", label: "Grosse 5", weight: "12-20 kg", count: 108, pricePerUnit: 0.45, total: 49 },
    { id: "ht6", label: "Grosse 6", weight: "16-30 kg", count: 96, pricePerUnit: 0.51, total: 49 },
  ],
};

const faq = [
  {
    q: "Was ist das Windel-Abo von Les Petits Culottes?",
    a: "Das Windel-Abo von Les Petits Culottes ist ein flexibler Service ohne Bindung, mit dem Sie hochwertige, in Frankreich hergestellte Windeln mit reduziertem okologischem Fussabdruck in der von Ihnen gewahlten Frequenz direkt nach Hause geliefert bekommen.",
  },
  {
    q: "Wie funktioniert das Abo?",
    a: "Ganz einfach: Sie wahlen die Windelgrosse und die Lieferfrequenz — wir kummern uns um den Rest. Sie konnen Ihr Abo jederzeit in Ihrem Kundenkonto anpassen oder pausieren. Und das alles mit einem Klick!",
  },
  {
    q: "Welche Vorteile hat ein Abo?",
    a: "Das Abo garantiert Ihnen: automatische Lieferung nach Hause in Ihrer Wunschfrequenz, attraktive Preise fur eine Monatsration Windeln, volle Flexibilitat bei Anderungen, und ein reduzierter okologischer Fussabdruck dank lokaler Herstellung.",
  },
  {
    q: "Kann ich die Grosse wahrend des Abos andern?",
    a: "Ja, Sie konnen die Windelgrosse jederzeit in Ihrem Kundenkonto andern — je nach Bedarf Ihres Babys.",
  },
  {
    q: "Was kostet das Windel-Abo?",
    a: "Der Preis hangt von der Windelgrosse ab. Das Abo startet ab 49 EUR pro Lieferung, inklusive kostenloser Lieferung nach ganz Deutschland.",
  },
  {
    q: "Wie kann ich mein Abo pausieren oder kundigen?",
    a: "Sie konnen Ihr Abo jederzeit direkt in Ihrem Kundenkonto pausieren oder kundigen — ohne versteckte Kosten, mit einem Klick.",
  },
  {
    q: "Ab welchem Alter Hoschenwinden?",
    a: "Hoschenwinden eignen sich ab dem Moment, in dem Ihr Baby aktiver wird — in der Regel ab 8-9 Monaten oder einem Gewicht von ca. 9-10 kg. Sie sind praktisch fur die Sauberkeitserziehung und bieten grosse Bewegungsfreiheit.",
  },
  {
    q: "Warum Hoschenwinden?",
    a: "Hoschenwinden lassen sich wie Unterhosen an- und ausziehen — ideal fur aktive Kinder. Sie bieten mehr Autonomie und sind dank verstarkter Absorption und ergonomischer Passform besonders auslaufsicher.",
  },
  {
    q: "Wie schnell wird geliefert?",
    a: "Innerhalb von 72 Stunden nach Versand. Wir versenden uber DHL mit Sendungsverfolgung an Ihre Hausstelle oder an eine DHL Packstation.",
  },
];

const birthGuide = [
  {
    label: "3-4 kg bei Geburt",
    badge: "95% der Geburten!",
    size: "Grosse 1+",
    desc: "Wir empfehlen Grosse 1+: 232 Windeln in 2 Grossen — 120 Windeln in Grosse 1 (2-4 kg) und 112 Windeln in Grosse 2 (3-5 kg). Ideal fur Babys mit einem Geburtsgewicht zwischen 3 und 4 kg.",
  },
  {
    label: "+4 kg bei Geburt",
    badge: null,
    size: "Grosse 2",
    desc: "Wir empfehlen Grosse 2: 224 Windeln in Grosse 2 (3-5 kg). Ideal fur Babys mit einem Geburtsgewicht uber 4 kg.",
  },
];

export default function AboPage() {
  const [subType, setSubType] = useState<SubType>("windeln");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [guideTab, setGuideTab] = useState(0);

  const currentSizes = sizes[subType];
  const selected = currentSizes.find((s) => s.id === selectedSize);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src={img.aboBg} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 via-teal/75 to-teal/50" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-[800] leading-tight mb-4">
            Windel-Abo:<br />Windeln & Hoschenwinden
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Wahlen Sie Ihren Windeltyp und die passende Grosse. Ab 49 EUR pro Lieferung,
            kostenlose Lieferung, jederzeit kundbar.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl font-[800]">800K+</div>
              <div className="text-xs opacity-80 mt-1">Zufriedene Eltern</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl font-[800]">10/10</div>
              <div className="text-xs opacity-80 mt-1">Kundenbewertung</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl font-[800]">72h</div>
              <div className="text-xs opacity-80 mt-1">Lieferzeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <div className="bg-grey-light py-3">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-xs md:text-sm text-grey-text font-medium">
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Made in France</span>
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Kostenlose Lieferung</span>
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Jederzeit kundbar</span>
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Kostenlose Retoure</span>
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> SEPA-Lastschrift</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* ═══ STEP 1: Type selector ═══ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">1</span>
            Windeltyp wahlen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => { setSubType("windeln"); setSelectedSize(null); }}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${subType === "windeln" ? "border-teal bg-teal/5 shadow-md" : "border-grey-border hover:border-teal/50"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={subType === "windeln" ? img.tabCouchesOn : img.tabCouchesOff} alt="" className="h-16 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Windeln</h3>
                <p className="text-grey-text text-sm">Klassische Windeln — Grosse 1+ bis 7</p>
                <p className="text-teal font-bold mt-1">49 EUR / Lieferung</p>
              </div>
            </button>
            <button
              onClick={() => { setSubType("hoeschen"); setSelectedSize(null); }}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${subType === "hoeschen" ? "border-teal bg-teal/5 shadow-md" : "border-grey-border hover:border-teal/50"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={subType === "hoeschen" ? img.tabCulottesOn : img.tabCulottesOff} alt="" className="h-16 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Hoschenwinden</h3>
                <p className="text-grey-text text-sm">Zum Hochziehen — Grosse 4 bis 6</p>
                <p className="text-teal font-bold mt-1">49 EUR / Lieferung</p>
              </div>
            </button>
          </div>
        </div>

        {/* ═══ STEP 2: Size selector ═══ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center text-sm font-bold">2</span>
            Grosse wahlen
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentSizes.map((size) => {
              const imgs = sizeImages[size.id];
              const isSelected = selectedSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected ? "border-teal bg-teal/5 shadow-md" : "border-grey-border hover:border-teal/50"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={isSelected ? imgs.hover : imgs.default}
                    alt={size.label}
                    className="h-16 mx-auto mb-2"
                  />
                  <h3 className="font-bold text-sm">{size.label}</h3>
                  <p className="text-grey-text text-xs">{size.weight}</p>
                  <p className="text-xs mt-1">{size.count} Stuck</p>
                  <p className="text-teal font-bold text-sm mt-1">{size.pricePerUnit.toFixed(2)} EUR/St.</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ Summary + CTA ═══ */}
        {selected && (
          <div className="bg-teal/5 border-2 border-teal rounded-2xl p-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sizeImages[selected.id].hover} alt="" className="h-16 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">
                    {subType === "windeln" ? "Windeln" : "Hoschenwinden"} — {selected.label}
                  </h3>
                  <p className="text-grey-text text-sm mt-1">
                    {selected.count} Windeln pro Lieferung ({selected.weight}) — {selected.pricePerUnit.toFixed(2)} EUR/Stuck
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-grey-text">
                    <span className="flex items-center gap-1"><span className="text-teal">&#10003;</span> Kostenlose Lieferung</span>
                    <span className="flex items-center gap-1"><span className="text-teal">&#10003;</span> Jederzeit kundbar</span>
                    <span className="flex items-center gap-1"><span className="text-teal">&#10003;</span> Kostenlose Retoure</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-[800] text-teal">{selected.total} EUR</div>
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
      </div>

      {/* ═══ BIRTH SIZE GUIDE ═══ */}
      <section className="bg-grey-light py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-xl font-[800] text-center mb-2">Welche Grosse fur Ihr Baby?</h2>
          <p className="text-grey-text text-sm text-center mb-6">Wir helfen Ihnen bei der Wahl der richtigen Grosse fur den ersten Monat!</p>
          <div className="flex gap-2 mb-4 justify-center">
            {birthGuide.map((tab, i) => (
              <button
                key={i}
                onClick={() => setGuideTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${guideTab === i ? "bg-teal text-white" : "bg-white border border-grey-border text-grey-text hover:border-teal"}`}
              >
                {tab.label}
                {tab.badge && <span className="ml-2 text-xs bg-lime/20 text-teal-dark px-2 py-0.5 rounded-full">{tab.badge}</span>}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-grey-border p-6">
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={birthGuide[guideTab].size === "Grosse 1+" ? img.sizeT1plusHover : img.sizeT2Hover} alt="" className="h-12" />
              <div>
                <span className="inline-block bg-teal/10 text-teal font-bold text-xs px-3 py-1 rounded-full">{birthGuide[guideTab].size}</span>
              </div>
            </div>
            <p className="text-sm text-grey-text leading-relaxed">{birthGuide[guideTab].desc}</p>
          </div>
        </div>
      </section>

      {/* ═══ GUARANTEES ═══ */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-[800] text-center mb-2">Unsere Garantien</h2>
          <p className="text-grey-text text-center mb-8">
            Entdecken Sie, warum <strong className="text-black">800.000 Eltern</strong> uns vertrauen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: img.voileNaturel, title: "Naturliches Innenvlies", desc: "Hautkontaktschicht aus naturlichen Materialien. Ohne Chlor, ohne Parfum, ohne Lotion." },
              { icon: img.classification, title: "Hochste Klassifizierung", desc: "Klasse A bei unabhangigen Absorptionstests — die hochste Bewertung auf dem Markt." },
              { icon: img.circuitCourt, title: "Kurze Lieferkette", desc: "Faire Preise dank Direktvertrieb aus den Vogesen und der Bretagne." },
            ].map((g) => (
              <div key={g.title} className="bg-grey-light rounded-2xl p-6 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.icon} alt={g.title} className="h-16 mx-auto mb-4" />
                <h3 className="font-bold mb-2">{g.title}</h3>
                <p className="text-grey-text text-sm">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPOSITION ═══ */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-[800] text-center mb-2">Hautkontaktschicht aus naturlichen Materialien</h2>
          <p className="text-grey-text text-center mb-8 max-w-2xl mx-auto text-sm">
            Die Zusammensetzung unserer Babywindeln wird von unabhangigen externen Laboren kontrolliert.
            Dank sorgfaltiger Auswahl der Materialien sind die Windeln frei von schadlichen Substanzen und endokrinen Disruptoren.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.schema01} alt="Zusammensetzung Windel" className="w-full rounded-xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.schema02} alt="Zusammensetzung Materialien" className="w-full rounded-xl" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-teal/10 text-teal font-medium px-4 py-2 rounded-full text-xs">Toxikologische Analyse (PDF)</span>
            <span className="bg-teal/10 text-teal font-medium px-4 py-2 rounded-full text-xs">Absorptionsergebnisse (Klasse A)</span>
            <span className="bg-teal/10 text-teal font-medium px-4 py-2 rounded-full text-xs">Detaillierte Zusammensetzung</span>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-grey-light py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-[800] text-center mb-8">So funktioniert das Windel-Abo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: img.fabNum01, icon: img.fabStep01, title: "Abo abschliessen", desc: "Wahlen Sie Ihren Windeltyp und die Grosse. Jeden Monat erhalten Sie eine Monatsration Windeln." },
              { num: img.fabNum02, icon: img.fabStep02, title: "Flexibel verwalten", desc: "Grosse andern, pausieren oder kundigen — jederzeit in Ihrem Kundenkonto, mit einem Klick!" },
              { num: img.fabNum03, icon: img.fabStep03, title: "Geliefert in 72h", desc: "Lieferung per DHL an Ihre Hausstelle oder an eine Packstation — kostenlos in ganz Deutschland." },
            ].map((s) => (
              <div key={s.title} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.num} alt="" className="h-10 mx-auto mb-3" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt={s.title} className="h-20 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-grey-text text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUE PROPOSITIONS ═══ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-[800] text-center mb-3">
            So viele gute Grunde fur ein Windel-Abo
          </h2>
          <p className="text-grey-text text-center mb-10 text-sm max-w-2xl mx-auto">
            Das Windel-Abo erleichtert den Alltag der Eltern und spart dabei Geld. Ob Sie viel beschaftigte Eltern sind oder einfach nur den Komfort Ihres Babys im Auge haben — unser Service ist fur Sie gemacht!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Totale Freiheit — ohne Bindung",
                desc: "Das Abo ist jederzeit kundbar. Sie konnen den Service testen, ohne langfristig gebunden zu sein. Ausserdem sorgt die monatliche Lieferung dafur, dass Sie nie ohne Windeln dastehen.",
              },
              {
                title: "Sparen mit dem Abo",
                desc: "Kostenlose Lieferung in ganz Deutschland. Jedes Paket kostet nur 49 EUR — das entspricht ab 0,21 EUR pro Windel. Hochwertige, in Frankreich hergestellte Windeln zu fairen Preisen.",
              },
              {
                title: "Mitwachsend — passt sich Ihrem Baby an",
                desc: "Das Abo ist mitwachsend: Sie konnen die Windelgrosse jederzeit andern. So hat Ihr Baby immer die perfekt passende Windel fur optimalen Komfort.",
              },
              {
                title: "Einfache Verwaltung",
                desc: "Automatische Verlangerung, Kundigung jederzeit moglich. Sie konnen Ihr Abo pausieren und jederzeit wieder aktivieren. Unser Kundenservice steht Ihnen 7 Tage die Woche zur Verfugung.",
              },
            ].map((v) => (
              <div key={v.title} className="border border-grey-border rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-grey-text text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FREE RETURNS ═══ */}
      <section className="bg-teal text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-[800] mb-3">Kostenlose Rucksendung ungeoffneter Pakete</h2>
          <p className="opacity-90 text-sm mb-6 max-w-2xl mx-auto">
            Ihr Baby wechselt die Grosse? Die Rucksendung Ihres kompletten Pakets ist jederzeit kostenlos per DHL-Retourenschein.
            Sie konnen auch ungeoffnete Windelpackungen zurucksenden und erhalten eine Erstattung.
            Wir antworten 7 Tage die Woche!
          </p>
          <button className="bg-white text-teal font-bold px-6 py-3 rounded-full hover:bg-grey-light transition-colors text-sm uppercase">
            Kontaktieren Sie uns
          </button>
        </div>
      </section>

      {/* ═══ PRODUCT CHARACTERISTICS ═══ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-[800] text-center mb-6">Was macht unsere Windel besonders?</h2>
          <div className="prose prose-sm text-grey-text max-w-none space-y-4 text-sm leading-relaxed">
            <p>
              Die Zusammensetzung unserer Babywindeln wird von unabhangigen externen Laboren kontrolliert.
              Dank sorgfaltiger Materialauswahl zur Vermeidung toxischer Stoffe, schadlicher Substanzen und endokriner Disruptoren
              ist der Po Ihres Babys bestens geschutzt. Dies wird durch die Hautkontaktschicht aus naturlichen Materialien
              sowie den Ersatz bestimmter synthetischer Stoffe durch sorgfaltig ausgewahlte Materialien ermoglicht.
            </p>
            <p>
              <strong className="text-black">Unser kleiner Unterschied:</strong> Um eine maximale Absorption zu gewahrleisten,
              verwenden wir so viel naturliche Zellulose wie moglich. Das ermoglicht uns die Absorptionsklassifizierung A —
              die hochste auf dem Markt — und garantiert Ihnen ruhige Nachte ohne Auslaufen.
            </p>
            <p>
              Die Windeln werden in den <strong className="text-black">Vogesen</strong> und die Hoschenwinden in der <strong className="text-black">Bretagne</strong> hergestellt.
              Ja, wir garantieren es: <strong className="text-black">100% Made in France!</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-grey-light py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-[800] mb-6">Haufig gestellte Fragen</h2>
              <div className="space-y-2">
                {faq.map((item, i) => (
                  <div key={i} className="bg-white border border-grey-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between font-medium hover:bg-grey-light/50 transition-colors"
                    >
                      <span className="text-sm">{item.q}</span>
                      <svg className={`w-5 h-5 text-grey-text flex-shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && <div className="px-5 pb-4 text-grey-text text-sm leading-relaxed">{item.a}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact sidebar */}
            <div>
              <div className="bg-teal text-white rounded-2xl p-6 sticky top-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.avatars} alt="" className="h-12 mb-4 brightness-0 invert" />
                <h3 className="font-bold text-lg mb-3">Eine Frage?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Eine Frage zu unseren Produkten oder Ihrer Bestellung?
                  Zogern Sie nicht, uns zu kontaktieren — wir freuen uns auf den Austausch mit Ihnen!
                </p>
                <button className="bg-white text-teal font-bold px-4 py-2 rounded-full text-sm hover:bg-grey-light transition-colors w-full uppercase">
                  Schreiben Sie uns
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BRAND STORY ═══ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-[800] mb-4">Die Geschichte hinter LPC</h2>
              <p className="text-grey-text text-sm leading-relaxed mb-4">
                Les Petits Culottes ist die Geschichte von zwei Abenteurern, Matthieu und Johan,
                die einen verantwortungsvolleren Weg der Herstellung und des Vertriebs einschlagen wollten.
              </p>
              <p className="text-grey-text text-sm leading-relaxed mb-6">
                So entstanden die Windel und die Babymilch im Direktvertrieb!
                Produkte ohne uberflussige Zwischenhandler — direkt von unseren franzosischen Herstellern zu Ihrem Baby!
              </p>
              <Link href="/" className="text-teal font-bold text-sm hover:text-teal-dark transition-colors inline-flex items-center gap-2 uppercase">
                Alles erfahren
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.carte} alt="Lieferkette Les Petits Culottes" className="max-w-xs mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CIRCUIT COURT ═══ */}
      <section className="bg-teal-medium text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-[800] mb-4">Was ist kurze Lieferkette, Version Les Petits Culottes?</h2>
          <p className="opacity-90 text-sm max-w-2xl mx-auto mb-4">
            Unsere Windeln werden in den Vogesen und der Bretagne hergestellt — zwei Regionen, ausgewahlt
            fur ihr Engagement und ihr lokales Know-how. Sobald Sie Ihr Abo bestellen, wird Ihr Produkt
            direkt aus einer dieser Fabriken an Sie verschickt — ohne uberflussige Zwischenhandler.
          </p>
          <p className="opacity-70 text-xs max-w-2xl mx-auto">
            Ihre Windel hat einen geringeren okologischen Fussabdruck als eine durchschnittliche Windel auf dem Markt,
            mit einer Reduktion von ca. 20% bei den untersuchten Indikatoren — basierend auf einer Lebenszyklusanalyse nach der ADEME-zertifizierten Methodik.
          </p>
        </div>
      </section>

      {/* ═══ TRANSPARENCY ═══ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-[800] mb-3">Volle Transparenz</h2>
          <p className="text-grey-text mb-6 max-w-2xl mx-auto text-sm">
            Wir veroffentlichen alle unsere Analysen: toxikologische Tests, Zusammensetzung, Absorptionsergebnisse.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-teal text-white px-5 py-2.5 rounded-full text-xs font-medium">Toxikologische Analyse (PDF)</span>
            <span className="bg-teal text-white px-5 py-2.5 rounded-full text-xs font-medium">Absorptionsergebnisse (PDF)</span>
            <span className="bg-teal text-white px-5 py-2.5 rounded-full text-xs font-medium">Zusammensetzung</span>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="bg-grey-light py-10">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-xl font-[800] mb-2">Die neuesten Nachrichten</h2>
          <p className="text-grey-text mb-6 text-sm">
            Melden Sie sich fur unseren Newsletter an und verpassen Sie kein Abenteuer!
          </p>
          <div className="flex gap-2">
            <input type="email" placeholder="Ihre E-Mail-Adresse" className="flex-grow px-4 py-3 rounded-full border border-grey-border focus:border-teal focus:outline-none text-sm" />
            <button className="bg-lime text-white font-bold px-6 py-3 rounded-full hover:bg-lime-dark transition-colors text-sm uppercase whitespace-nowrap">
              Los geht&apos;s!
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
