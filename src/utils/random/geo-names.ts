const geoTimeNames = [
  "Aquazoic", "Pyrozoic", "Cryozoic", "Lithozoic", "Terrazoic", "Aerozoic", "Umbrazoic", "Solazoic", "Lunazoic", "Stellazoic",
  "Ferrozoic", "Auruzoic", "Argenzoic", "Cupruzoic", "Nemozoic", "Petrozoic", "Crystazoic", "Magmazoic", "Glaciozoic", "Thermozoic",
  "Hydrozoic", "Volcanozoic", "Fungozoic", "Florazoic", "Faunazoic", "Arachnozoic", "Reptizoic", "Avizoic", "Mammazoic", "Silvazoic",
  "Velorian", "Kratonian", "Zephyrian", "Morganian", "Tarsonian", "Belmorian", "Calderian", "Drakonian", "Eskerian", "Fenrian",
  "Galvanian", "Ilmenian", "Jorvian", "Kelvanian", "Lorian", "Mordian", "Norvian", "Ostrian", "Pelorian", "Quorrian",
  "Ravenian", "Sorvian", "Tavarian", "Ulvarian", "Vardian", "Wexlian", "Xandrian", "Yorvian", "Zerlian", "Altarian",
  "Brenthian", "Corvanian", "Dolmenian", "Elvarian", "Faldorian", "Garnetian", "Halvarian", "Isarian", "Jaskarian", "Korvanian",
  "Lomarian", "Marnian", "Nordavian", "Orvalian", "Pendarian", "Quilonian", "Rovanian", "Sarnian", "Tolvarian", "Umbarian",
  "Vesparian", "Wyndarian", "Xerolian", "Yarvian", "Zolvarian", "Amberian", "Basaltian", "Cindarian", "Dunarian", "Emberian",
  "Flintian", "Granitian", "Havenian", "Ironian", "Jaspian", "Kaolinian", "Lavarian", "Marlian", "Nebulian", "Opalian",
  "Pumician", "Quartzian", "Rubian", "Slatian", "Talcian", "Umberian", "Vitrian", "Wolframian", "Xenolian", "Yttrian",
  "Zirconian", "Alluvian", "Boreolian", "Carbonian", "Delvian", "Estuarian", "Fjordian", "Gorgonian", "Hollowian", "Karstian",
  "Lagunian", "Morainian", "Nunatakian", "Oasian", "Peatian", "Quagmirian", "Rifftian", "Steppian", "Tundrian", "Upwellian",
  "Wetlandian", "Xerician", "Yardangian", "Zonalian", "Abyssian", "Benthian", "Coralian", "Deltaian", "Eddian", "Floeian",
  "Geyserian", "Hadalian", "Isthmian", "Kelpian", "Lagoonian", "Mangrovian", "Nektonian", "Oceanian", "Pelagian", "Reefian",
  "Aquene", "Borene", "Cryene", "Dunene", "Erosene", "Ferrene", "Glacene", "Halene", "Ignene", "Jovene",
  "Kalene", "Lithene", "Magmene", "Nivene", "Orene", "Pyrene", "Quarzene", "Rubene", "Salene", "Tephrene",
  "Umbrene", "Volcene", "Xerene", "Yttrene", "Zephene", "Alpene", "Basene", "Calcene", "Delene", "Esterene",
  "Fluvene", "Gyrene", "Hydrene", "Ionene", "Jadene", "Karene", "Lunene", "Marene", "Neptene", "Ozene",
  "Paldene", "Quenene", "Riftene", "Solene", "Terrene", "Ulvene", "Vertene", "Wyndene", "Xenene", "Zonene",
  "Aeroic", "Boreoic", "Cryoic", "Dynoic", "Eoic", "Ferroic", "Geoic", "Hydroic", "Ignoic", "Lithoic",
  "Magnoic", "Neoic", "Oroic", "Pyroic", "Quantoic", "Rhizoic", "Saxoic", "Thermoic", "Ultroic", "Vitoic",
  "Argillic", "Basaltic", "Calcic", "Dolomitic", "Evaporic", "Ferric", "Gneissic", "Hadric", "Ignic", "Kimberlic",
  "Lavic", "Metamic", "Nivalic", "Orogenic", "Pelitic", "Quartzic", "Rhyolitic", "Sedimic", "Tectonic", "Ultrabasic",
  "Altaran", "Borean", "Corvan", "Draconan", "Eskaran", "Fenran", "Garran", "Helvan", "Ionan", "Jorran",
  "Kavaran", "Lorran", "Marvan", "Nolvan", "Ostran", "Pelran", "Quorvan", "Ravan", "Sarvan", "Talvan",
  "Ulran", "Vorlan", "Wexan", "Xorvan", "Yaran", "Zelvan", "Arkan", "Belvan", "Cindran", "Dorvan",
  "Aetherean", "Boreadean", "Chthonean", "Draconean", "Elysean", "Fulgurean", "Gaean", "Hyalean", "Ignean", "Jovean",
  "Kraterean", "Lethean", "Mesolean", "Noctean", "Olympean", "Pyrean", "Quasarean", "Rhodean", "Stygean", "Titanean",
  "Uranean", "Vulcanean", "Wraithean", "Xenean", "Yggdrean", "Zenithean", "Abyssean", "Boreean", "Cyclopean", "Dolomean"
];

export function getGeoTimeName (i: number) {
  return geoTimeNames[i]
}