import Link from "next/link";
import { img } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-teal text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Social */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.logoFooter}
              alt="Les Petits Culottes"
              className="h-14 mb-4"
            />
            <div className="flex gap-3 mt-4">
              {["Instagram", "Facebook", "YouTube"].map((s) => (
                <span
                  key={s}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs hover:bg-white/30 transition-colors cursor-pointer"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">
              Les Petits Culottes
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/" className="hover:opacity-100">Uber uns</Link></li>
              <li><Link href="/" className="hover:opacity-100">Kurze Lieferkette</Link></li>
              <li><Link href="/" className="hover:opacity-100">Lieferung in 72h</Link></li>
              <li><Link href="/" className="hover:opacity-100">Kostenlose Retoure</Link></li>
              <li><Link href="/" className="hover:opacity-100">Blog</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Windeln</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/abo" className="hover:opacity-100">Windel-Abo</Link></li>
              <li><Link href="/abo" className="hover:opacity-100">Hoschenwinden</Link></li>
              <li><Link href="/abo" className="hover:opacity-100">Grossenratgeber</Link></li>
              <li><Link href="/" className="hover:opacity-100">Windeltorte</Link></li>
            </ul>
          </div>

          {/* Col 4 - Legal */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Rechtliches</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/" className="hover:opacity-100">Impressum</Link></li>
              <li><Link href="/" className="hover:opacity-100">AGB</Link></li>
              <li><Link href="/" className="hover:opacity-100">Datenschutzerklarung</Link></li>
              <li><Link href="/" className="hover:opacity-100">Widerrufsbelehrung</Link></li>
              <li><Link href="/" className="hover:opacity-100">Kontakt</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-70">
          <p>&copy; 2026 Les Petits Culottes Deutschland. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <span>SEPA</span>
            <span>PayPal</span>
            <span>Klarna</span>
            <span>Visa</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
