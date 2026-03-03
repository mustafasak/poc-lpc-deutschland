"use client";

import Link from "next/link";
import { useState } from "react";
import { img } from "@/lib/images";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top reassurance bar */}
      <div className="bg-teal text-white text-center py-2 text-xs md:text-sm font-medium tracking-wide">
        <div className="flex justify-center gap-8 overflow-hidden">
          <span>SCHNELLE LIEFERUNG 72h</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">WINDELN MADE IN FRANCE</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">800.000 ZUFRIEDENE ELTERN</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">KOSTENLOSE RETOURE</span>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.menuBurger} alt="Menu" className="w-7 h-7" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.logo}
              alt="Les Petits Culottes"
              className="h-12 md:h-16 hidden md:block"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.logoMobile}
              alt="Les Petits Culottes"
              className="h-10 md:hidden"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
            <Link href="/" className="hover:text-teal transition-colors">
              Startseite
            </Link>
            <Link href="/abo" className="hover:text-teal transition-colors flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.coucheBio} alt="" className="w-5 h-5" />
              Windeln
            </Link>
            <span className="text-grey-text cursor-default flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.laitBox} alt="" className="w-5 h-5 opacity-50" />
              Bio-Milch
            </span>
            <Link href="/" className="hover:text-teal transition-colors">
              Qualitat
            </Link>
            <Link
              href="/abo"
              className="bg-lime text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-lime-dark transition-colors uppercase tracking-wide flex items-center gap-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.colis} alt="" className="w-4 h-4 brightness-0 invert" />
              Testpaket
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link href="/mein-konto" className="hover:opacity-70 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.user} alt="Mein Konto" className="w-6 h-6" />
            </Link>
            <button className="relative hover:opacity-70 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.cart} alt="Warenkorb" className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-grey-border bg-white px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-800 font-medium py-2" onClick={() => setMenuOpen(false)}>
              Startseite
            </Link>
            <Link href="/abo" className="block text-gray-800 font-medium py-2" onClick={() => setMenuOpen(false)}>
              Windeln im Abo
            </Link>
            <Link href="/mein-konto" className="block text-gray-800 font-medium py-2" onClick={() => setMenuOpen(false)}>
              Mein Konto
            </Link>
            <Link
              href="/abo"
              className="block bg-lime text-white text-center font-bold px-4 py-3 rounded-full uppercase text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Testpaket bestellen
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
