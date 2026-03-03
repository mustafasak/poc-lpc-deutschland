"use client";

import Link from "next/link";
import { useState } from "react";

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
            className="md:hidden text-teal-dark"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col items-center">
              <span className="text-teal font-[800] text-xl md:text-2xl leading-tight tracking-tight">
                LES PETITS
              </span>
              <span className="text-teal font-[800] text-xl md:text-2xl leading-tight tracking-tight">
                CULOTTES
              </span>
              <span className="text-teal-dark text-[9px] tracking-[0.2em] font-medium mt-0.5">
                DEUTSCHLAND
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
            <Link href="/" className="hover:text-teal transition-colors">
              Startseite
            </Link>
            <Link href="/abo" className="hover:text-teal transition-colors">
              Windeln
            </Link>
            <span className="text-grey-text cursor-default">
              Bio-Milch
            </span>
            <Link href="/" className="hover:text-teal transition-colors">
              Qualitat
            </Link>
            <Link href="/" className="hover:text-teal transition-colors">
              Unsere Geschichte
            </Link>
            <Link
              href="/abo"
              className="bg-lime text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-lime-dark transition-colors uppercase tracking-wide"
            >
              Testpaket
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <Link
              href="/mein-konto"
              className="text-teal hover:text-teal-dark transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
            <button className="text-teal hover:text-teal-dark transition-colors relative">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-grey-border bg-white px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-800 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Startseite
            </Link>
            <Link
              href="/abo"
              className="block text-gray-800 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Windeln im Abo
            </Link>
            <Link
              href="/mein-konto"
              className="block text-gray-800 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
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
