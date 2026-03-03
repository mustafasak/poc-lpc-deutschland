import Link from "next/link";
import Image from "next/image";
import { img } from "@/lib/images";

export default function Home() {
  return (
    <>
      {/* Hero with real LPC background */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={img.heroCouches}
            alt="Les Petits Culottes - Windeln im Abo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/90 via-teal/70 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Neu in Deutschland
            </span>
            <h1 className="text-3xl md:text-5xl font-[800] leading-tight mb-4">
              Die erste franzosische Windel — jetzt auch in Deutschland!
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 font-medium">
              100% kurze Lieferkette, im Abo. Hergestellt in Frankreich,
              geliefert in 72h nach ganz Deutschland.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/abo"
                className="bg-lime hover:bg-lime-dark text-white font-bold text-center px-8 py-4 rounded-full text-lg transition-colors uppercase tracking-wide"
              >
                Kostenlos testen
              </Link>
              <Link
                href="/abo"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-center px-8 py-4 rounded-full text-lg transition-colors border border-white/30"
              >
                Abo entdecken
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl md:text-3xl font-[800]">800K+</div>
              <div className="text-xs opacity-80 mt-1">Zufriedene Eltern</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl md:text-3xl font-[800]">9.9/10</div>
              <div className="text-xs opacity-80 mt-1">Kundenbewertung</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-2xl md:text-3xl font-[800]">72h</div>
              <div className="text-xs opacity-80 mt-1">Lieferzeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-grey-light py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm text-grey-text font-medium">
          <span className="flex items-center gap-2">
            <span className="text-teal text-lg">&#10003;</span> Hergestellt in Frankreich
          </span>
          <span className="flex items-center gap-2">
            <span className="text-teal text-lg">&#10003;</span> Gelagert in Deutschland
          </span>
          <span className="flex items-center gap-2">
            <span className="text-teal text-lg">&#10003;</span> SEPA-Lastschrift
          </span>
          <span className="flex items-center gap-2">
            <span className="text-teal text-lg">&#10003;</span> Jederzeit kundbar
          </span>
          <span className="flex items-center gap-2">
            <span className="text-teal text-lg">&#10003;</span> DHL Lieferung
          </span>
        </div>
      </section>

      {/* Popular products with real images */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl text-center mb-2">
            Unsere beliebtesten Produkte
          </h2>
          <p className="text-center text-grey-text mb-10">
            Alle Produkte werden innerhalb von 72h geliefert!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Testpaket Windeln", desc: "6 kostenlose Windeln zum Testen", price: "GRATIS", cta: "Jetzt testen", href: "/abo", image: img.prodKitCouches },
              { title: "Windel-Abo", desc: "Windeln & Hoschenwinden im Abo", price: "ab 49 EUR/Lieferung", cta: "Jetzt abonnieren", href: "/abo", image: img.prodAboCouches },
              { title: "Bio-Babymilch Abo", desc: "Franzosische Bio-Babymilch im Abo", price: "ab 39 EUR/Lieferung", cta: "Entdecken", href: "/abo", image: img.prodAboLait },
              { title: "Windeltorte", desc: "Das perfekte Geschenk: 232 Windeln", price: "ab 59 EUR", cta: "Entdecken", href: "/", image: img.prodGateau },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group bg-white rounded-2xl border border-grey-border hover:border-teal hover:shadow-lg transition-all p-4 flex flex-col"
              >
                <div className="w-full h-48 rounded-xl mb-4 overflow-hidden bg-grey-light relative">
                  <Image src={p.image} alt={p.title} fill className="object-contain p-2 group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-teal transition-colors">{p.title}</h3>
                <p className="text-grey-text text-sm mb-3 flex-grow">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-teal font-bold text-sm">{p.price}</span>
                  <span className="bg-lime text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-lime-dark transition-colors uppercase">
                    {p.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Green banner */}
      <section className="bg-teal-medium text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-[800] leading-tight">
            Die erste franzosische Babywindel im Abo —<br />
            100% kurze Lieferkette, jetzt in Deutschland
          </h2>
        </div>
      </section>

      {/* Product selector with real icons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl text-center mb-10">
            Wahlen Sie Ihr Produkt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link
              href="/abo"
              className="group bg-white border-2 border-grey-border hover:border-teal rounded-2xl p-8 text-center transition-all hover:shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.selectCouches} alt="Windeln" className="h-24 mx-auto mb-4 group-hover:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.selectCouchesHover} alt="Windeln" className="h-24 mx-auto mb-4 hidden group-hover:block" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-teal transition-colors">Windel-Abo</h3>
              <p className="text-grey-text text-sm mb-4">Windeln & Hoschenwinden</p>
              <span className="inline-block bg-lime text-white font-bold px-6 py-3 rounded-full group-hover:bg-lime-dark transition-colors uppercase text-sm">
                Jetzt abonnieren
              </span>
            </Link>
            <div className="group bg-white border-2 border-grey-border rounded-2xl p-8 text-center opacity-60 cursor-default">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.selectLait} alt="Bio-Milch" className="h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Bio-Milch Abo</h3>
              <p className="text-grey-text text-sm mb-4">Franzosische Bio-Babymilch</p>
              <span className="inline-block bg-grey-text text-white font-bold px-6 py-3 rounded-full uppercase text-sm">
                Bald verfugbar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing with real illustrations */}
      <section className="bg-grey-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl text-center mb-4">
            Franzosische Babywindeln, kurze Lieferkette
          </h2>
          <p className="text-center text-grey-text mb-12 max-w-2xl mx-auto">
            Von der Herstellung in den Vogesen bis zur Lieferung an Ihre Hausstelle — wir kontrollieren jeden Schritt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: img.fabNum01, icon: img.fabStep01, title: "Made in France", desc: "Unsere Windeln werden in den Vogesen und der Vendee hergestellt — im Herzen Frankreichs." },
              { num: img.fabNum02, icon: img.fabStep02, title: "Kurze Transportwege", desc: "Vom Hersteller direkt zu unserem Lager in Deutschland — ohne Umwege." },
              { num: img.fabNum03, icon: img.fabStep03, title: "Direkt zu Ihnen", desc: "Lieferung in 72h an Ihre Hausstelle oder an eine DHL Packstation." },
            ].map((s) => (
              <div key={s.title} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.num} alt="" className="h-10 mx-auto mb-3" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt={s.title} className="h-24 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-grey-text text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees with real badges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl text-center mb-4">Unsere Garantien</h2>
          <p className="text-center text-grey-text mb-12">Entdecken Sie, warum 800.000 Eltern uns vertrauen.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: img.garantie01, title: "Analyse auf endokrine Disruptoren", desc: "Alle Windeln werden auf uber 450 Substanzen getestet" },
              { icon: img.voileNaturel, title: "Naturliches Innenvlies", desc: "Hautfreundliches Vlies aus naturlichen Materialien" },
              { icon: img.circuitCourtBadge, title: "Kurze Lieferkette", desc: "100% franzosische Produktion, direkt zu Ihnen" },
            ].map((g) => (
              <div key={g.title} className="text-center bg-white rounded-2xl border border-grey-border p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.icon} alt={g.title} className="h-20 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{g.title}</h3>
                <p className="text-grey-text text-sm">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA with real avatar */}
      <section className="bg-teal text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.avatars} alt="" className="h-16 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-[800] mb-4">Eine Frage?</h2>
          <p className="opacity-90 mb-6">Unser Kundenservice ist 7 Tage die Woche fur Sie da — auf Deutsch!</p>
          <button className="bg-white text-teal font-bold px-8 py-3 rounded-full hover:bg-grey-light transition-colors uppercase text-sm">
            Schreiben Sie uns
          </button>
        </div>
      </section>

      {/* Supply chain map */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl mb-6">Unsere kurze Lieferkette</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.carte} alt="Lieferkette Frankreich" className="max-w-md mx-auto mb-6" />
          <p className="text-grey-text mb-6 max-w-2xl mx-auto">
            2017 grundeten Matthieu und Johan Les Petits Culottes — mit einer einfachen Idee: eine hochwertige, franzosische Windel zu einem fairen Preis, direkt an die Eltern geliefert.
          </p>
          <Link href="/" className="text-teal font-bold hover:text-teal-dark transition-colors inline-flex items-center gap-2">
            Mehr erfahren
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-grey-light py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-[800] mb-2">Die neuesten Nachrichten</h2>
          <p className="text-grey-text mb-6 text-sm">Erhalten Sie unsere Tipps, Angebote und Neuigkeiten.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Ihre E-Mail-Adresse" className="flex-grow px-4 py-3 rounded-full border border-grey-border focus:border-teal focus:outline-none text-sm" />
            <button className="bg-lime text-white font-bold px-6 py-3 rounded-full hover:bg-lime-dark transition-colors text-sm uppercase whitespace-nowrap">
              Los geht&apos;s!
            </button>
          </div>
          <label className="flex items-start gap-2 mt-3 text-xs text-grey-text text-left">
            <input type="checkbox" className="mt-0.5" />
            <span>
              Ich stimme dem Empfang von Werbe-E-Mails zu.{" "}
              <Link href="/" className="underline">Datenschutzerklarung</Link>
            </span>
          </label>
        </div>
      </section>
    </>
  );
}
