// Les Petits Culottes — real asset URLs
const BASE = "https://www.lespetitsculottes.com/themes/les-petits-culottes-v2/img";

export const img = {
  // Logos
  logo: `${BASE}/ptc_logo.svg`,
  logoMobile: `${BASE}/logo-mobile.svg`,
  logoFooter: `${BASE}/LPC-logo_footer.svg`,

  // Hero banners
  heroCouches: `${BASE}/Accueil_couche_1920px.webp`,
  heroLait: `${BASE}/Accueil_Lait_1920px.webp`,
  heroT7: `${BASE}/T7-1920x650.webp`,

  // Product cards
  prodKitCouches: `${BASE}/produit-kit-couches.webp`,
  prodAboCouches: `${BASE}/produit-abo-couches.webp`,
  prodKitLait: `${BASE}/produit-kit-lait.webp`,
  prodAboLait: `${BASE}/produit-abo-lait.webp`,
  prodGateau: `${BASE}/produit-gateau-couches.webp`,

  // Category selectors
  selectCouches: `${BASE}/selection-couches.svg`,
  selectCouchesHover: `${BASE}/selection-couches_hover.svg`,
  selectLait: `${BASE}/selection-lait.svg`,
  selectLaitHover: `${BASE}/selection-lait_hover.svg`,

  // Subscription type tabs
  tabCouchesOn: `${BASE}/section-couches-on.svg`,
  tabCouchesOff: `${BASE}/section-couches-off.svg`,
  tabCulottesOn: `${BASE}/section-couches-culottes-on.svg`,
  tabCulottesOff: `${BASE}/section-couches-culottes-off.svg`,

  // Size selector animals (default / hover)
  sizeT1plus: `${BASE}/Picto-singe-1+.svg`,
  sizeT1plusHover: `${BASE}/Picto-singe-1+_hover.svg`,
  sizeT2: `${BASE}/product-couche03.svg`,
  sizeT2Hover: `${BASE}/product-couche03_hover.svg`,
  sizeT3: `${BASE}/product-couche04.svg`,
  sizeT3Hover: `${BASE}/product-couche04_hover.svg`,
  sizeT4: `${BASE}/product-couche05.svg`,
  sizeT4Hover: `${BASE}/product-couche05_hover.svg`,
  sizeT5: `${BASE}/product-couche06.svg`,
  sizeT5Hover: `${BASE}/product-couche06_hover.svg`,
  sizeT6: `${BASE}/product-couche07.svg`,
  sizeT6Hover: `${BASE}/product-couche07_hover.svg`,
  sizeT7: `${BASE}/T7-gorille-01.png`,
  sizeT7Hover: `${BASE}/T7-gorille-02.png`,

  // Manufacturing / circuit court
  fabStep01: `${BASE}/fabrication-item01.svg`,
  fabStep02: `${BASE}/fabrication-item02.svg`,
  fabStep03: `${BASE}/fabrication-item03.svg`,
  fabNum01: `${BASE}/number01.svg`,
  fabNum02: `${BASE}/number02.svg`,
  fabNum03: `${BASE}/number03.svg`,
  carte: `${BASE}/carte.svg`,
  frenchManufacturing: `${BASE}/french-manufacturing.svg`,

  // Guarantee badges
  garantie01: `${BASE}/garanties_home01.svg`,
  garantie02: `${BASE}/garanties_home02.svg`,
  voileNaturel: `${BASE}/PICTOO-voile-naturel.svg`,
  classification: `${BASE}/PICTOO_Plan_de_travail_1.png`,
  circuitCourt: `${BASE}/PICTOO-03.png`,
  circuitCourtBadge: `${BASE}/vignette-circuit-court.png`,

  // Composition diagrams
  schema01: `${BASE}/schema-endrocriniens01.svg`,
  schema02: `${BASE}/schema-endrocriniens02.svg`,

  // UI icons
  user: `${BASE}/user.svg`,
  cart: `${BASE}/lpc-cart.svg`,
  menuBurger: `${BASE}/menu-burger.svg`,
  close: `${BASE}/close.svg`,
  questionPicto: `${BASE}/question-picto.svg`,
  avatars: `${BASE}/avatars.svg`,
  colis: `${BASE}/colis-menu.svg`,
  coucheBio: `${BASE}/couche-bio.svg`,
  laitBox: `${BASE}/Boites-lait-1.svg`,

  // Subscription page background
  aboBg: `${BASE}/abonnement-couche_bg.jpg`,
} as const;

// Size image mapping for the subscription page
export const sizeImages: Record<string, { default: string; hover: string }> = {
  t1plus: { default: img.sizeT1plus, hover: img.sizeT1plusHover },
  t2: { default: img.sizeT2, hover: img.sizeT2Hover },
  t3: { default: img.sizeT3, hover: img.sizeT3Hover },
  t4: { default: img.sizeT4, hover: img.sizeT4Hover },
  t5: { default: img.sizeT5, hover: img.sizeT5Hover },
  t6: { default: img.sizeT6, hover: img.sizeT6Hover },
  t7: { default: img.sizeT7, hover: img.sizeT7Hover },
  ht4: { default: img.sizeT4, hover: img.sizeT4Hover },
  ht5: { default: img.sizeT5, hover: img.sizeT5Hover },
  ht6: { default: img.sizeT6, hover: img.sizeT6Hover },
};
