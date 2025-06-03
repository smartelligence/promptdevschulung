import { Order, Customs, RailDangerousGoodsCIM, UnionCustomsCode, MaritimeSafetyLaw, CargoSecuringStVO22, Product } from '../models.js';

/**
 * Erstellt ein Zoll-Vollständigkeitsprofil für einen gegebenen Auftrag.
 * @param {Order} auftrag Das zu analysierende Auftragsobjekt.
 * @param {Product} [produktDetails] Optionale Produktdetails für erweiterte Prüfungen.
 * @returns {object} Ein Profilobjekt mit Score, geprüften Bereichen und Problempunkten.
 */
export function erstelleZollVollstaendigkeitsProfil(auftrag, produktDetails) {
  const profil = {
    gesamtScore: 100, // Startwert, Abzüge für fehlende/problematische Daten
    gepruefteBereiche: [],
    problempunkte: [],
  };

  if (!(auftrag instanceof Order)) {
    profil.problempunkte.push({
      bereich: "Global",
      meldung: "Ungültiges Auftragsobjekt übergeben.",
      schweregrad: "kritisch"
    });
    profil.gesamtScore = 0;
    return profil;
  }

  // 2. Allgemeine Zollinformationen prüfen
  if (auftrag.customs instanceof Customs) {
    profil.gepruefteBereiche.push("Allgemeine Zollinformationen");
    pruefeAllgemeineZollDaten(auftrag.customs, profil, produktDetails);

    // 2.1. Spezifische Zollregularien prüfen (verschachtelte Aufrufe)
    if (auftrag.customs.railDangerousGoodsCIM instanceof RailDangerousGoodsCIM) {
      profil.gepruefteBereiche.push("Gefahrentransport Schiene (CIM)");
      pruefeCIMDaten(auftrag.customs.railDangerousGoodsCIM, profil);
    } else {
      // Optional: Vermerk, wenn CIM-Daten erwartet aber nicht vorhanden sind
      // z.B. if (produktDetails && produktDetails.requiresCIM) { ... }
    }

    if (auftrag.customs.unionCustomsCode instanceof UnionCustomsCode) {
      profil.gepruefteBereiche.push("Unionszollkodex (UZK)");
      pruefeUZKDaten(auftrag.customs.unionCustomsCode, profil);
    }

    if (auftrag.customs.maritimeSafetyLaw instanceof MaritimeSafetyLaw) {
      profil.gepruefteBereiche.push("Seesicherheitsrecht");
      pruefeSeesicherheitsDaten(auftrag.customs.maritimeSafetyLaw, profil, produktDetails);
    }

    if (auftrag.customs.cargoSecuringStVO22 instanceof CargoSecuringStVO22) {
      profil.gepruefteBereiche.push("Ladungssicherung StVO §22");
      pruefeStVO22Daten(auftrag.customs.cargoSecuringStVO22, profil);
    }

  } else {
    profil.problempunkte.push({
      bereich: "Allgemein",
      meldung: "Keine Zollinformationen (Customs-Objekt) für den Auftrag vorhanden.",
      schweregrad: "hoch"
    });
    profil.gesamtScore -= 50; // Beispielhafter Abzug
  }

  profil.gesamtScore = Math.max(0, profil.gesamtScore); // Sicherstellen, dass Score nicht negativ wird

  return profil;
}

function pruefeAllgemeineZollDaten(customsData, profil, produktDetails) {
  if (!customsData.tariffNumber) {
    profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", meldung: "Zolltarifnummer fehlt.", schweregrad: "mittel" });
    profil.gesamtScore -= 10;
  }
  if (!customsData.originCountry) {
    profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", meldung: "Ursprungsland fehlt.", schweregrad: "mittel" });
    profil.gesamtScore -= 10;
  }
  if (typeof customsData.customsValue !== 'number' || customsData.customsValue <= 0) {
    profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", meldung: "Gültiger Zollwert fehlt oder ist ungültig.", schweregrad: "mittel" });
    profil.gesamtScore -= 10;
  }
  if (!customsData.customsStatus) {
    profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", meldung: "Zollstatus fehlt.", schweregrad: "niedrig" });
    profil.gesamtScore -= 5;
  }

  if (!customsData.documents || customsData.documents.length === 0) {
    profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", meldung: "Keine Dokumente hinterlegt.", schweregrad: "mittel" });
    profil.gesamtScore -= 5;
  } else {
    const hatRechnung = customsData.documents.some(doc => doc.type && typeof doc.type === 'string' && doc.type.toLowerCase().includes('rechnung'));
    if (!hatRechnung) {
      profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", unterbereich: "Dokumente", meldung: "Handelsrechnung fehlt in den Dokumenten.", schweregrad: "hoch" });
      profil.gesamtScore -= 10;
    }
    customsData.documents.forEach((doc, index) => {
      if (!doc.type || !doc.url) {
        profil.problempunkte.push({ bereich: "Allgemeine Zollinformationen", unterbereich: "Dokumente", meldung: `Dokument ${index + 1} ist unvollständig (Typ oder URL fehlt).`, schweregrad: "niedrig" });
        profil.gesamtScore -= 2;
      }
    });
  }
}

function pruefeCIMDaten(cimData, profil) {
  if (cimData.isDangerousGoods) {
    if (!cimData.unNumber) {
      profil.problempunkte.push({ bereich: "CIM", meldung: "UN-Nummer fehlt bei deklariertem Gefahrgut.", schweregrad: "hoch" });
      profil.gesamtScore -= 15;
    }
    if (!cimData.classCode) {
      profil.problempunkte.push({ bereich: "CIM", meldung: "Gefahrgutklasse fehlt bei deklariertem Gefahrgut.", schweregrad: "hoch" });
      profil.gesamtScore -= 10;
    }
    if (!cimData.packagingGroup) {
      profil.problempunkte.push({ bereich: "CIM", meldung: "Verpackungsgruppe fehlt bei deklariertem Gefahrgut.", schweregrad: "mittel" });
      profil.gesamtScore -= 7;
    }
    if (!cimData.cimDocumentUrl) {
        profil.problempunkte.push({ bereich: "CIM", meldung: "Link zum CIM-Dokument fehlt bei deklariertem Gefahrgut.", schweregrad: "mittel" });
        profil.gesamtScore -= 5;
    }
  } else {
    if (cimData.unNumber || cimData.classCode || cimData.packagingGroup || cimData.cimDocumentUrl) {
        profil.problempunkte.push({ bereich: "CIM", meldung: "Gefahrgutdetails vorhanden, obwohl nicht als Gefahrgut deklariert.", schweregrad: "warnung" });
        profil.gesamtScore -= 2;
    }
  }
}

function pruefeUZKDaten(uccData, profil) {
    if (!uccData.codeReference) {
        profil.problempunkte.push({ bereich: "UZK", meldung: "Referenz zum UZK-Artikel fehlt.", schweregrad: "niedrig" });
        profil.gesamtScore -= 2;
    }
    if (!uccData.complianceStatus) {
        profil.problempunkte.push({ bereich: "UZK", meldung: "Compliance Status nicht gesetzt.", schweregrad: "mittel" });
        profil.gesamtScore -= 5;
    } else if (uccData.complianceStatus.toLowerCase() === 'offen') {
        profil.problempunkte.push({ bereich: "UZK", meldung: "Compliance Status ist 'offen'.", schweregrad: "warnung" });
        profil.gesamtScore -= 3;
    }
    if (!uccData.declarationType) {
        profil.problempunkte.push({ bereich: "UZK", meldung: "Anmeldungsart fehlt.", schweregrad: "mittel" });
        profil.gesamtScore -= 5;
    }
}

function pruefeSeesicherheitsDaten(maritimeData, profil, produktDetails) {
    // Annahme: produktDetails könnte eine Eigenschaft wie 'transportMode' haben.
    // Für dieses Beispiel gehen wir davon aus, dass es immer geprüft wird, wenn MaritimeSafetyLaw vorhanden ist.
    if (!maritimeData.imoNumber) {
        profil.problempunkte.push({ bereich: "Seesicherheit", meldung: "IMO-Nummer fehlt.", schweregrad: "hoch" });
        profil.gesamtScore -= 10;
    }
    if (!maritimeData.safetyCertificateUrl) {
        profil.problempunkte.push({ bereich: "Seesicherheit", meldung: "Link zum Sicherheitszertifikat fehlt.", schweregrad: "mittel" });
        profil.gesamtScore -= 7;
    }
    if (!maritimeData.vesselName) {
        profil.problempunkte.push({ bereich: "Seesicherheit", meldung: "Schiffsname fehlt.", schweregrad: "niedrig" });
        profil.gesamtScore -= 3;
    }
    if (!maritimeData.flagState) {
        profil.problempunkte.push({ bereich: "Seesicherheit", meldung: "Flaggenstaat fehlt.", schweregrad: "niedrig" });
        profil.gesamtScore -= 3;
    }
}

function pruefeStVO22Daten(stvoData, profil) {
    if (!stvoData.securingMethod) {
        profil.problempunkte.push({ bereich: "Ladungssicherung StVO", meldung: "Methode der Ladungssicherung nicht dokumentiert.", schweregrad: "mittel" });
        profil.gesamtScore -= 5;
    }
    if (!stvoData.inspectionReportUrl) {
        profil.problempunkte.push({ bereich: "Ladungssicherung StVO", meldung: "Link zum Prüfbericht der Ladungssicherung fehlt.", schweregrad: "mittel" });
        profil.gesamtScore -= 5;
    }
    if (!stvoData.responsiblePerson) {
        profil.problempunkte.push({ bereich: "Ladungssicherung StVO", meldung: "Verantwortliche Person für Ladungssicherung nicht dokumentiert.", schweregrad: "niedrig" });
        profil.gesamtScore -= 2;
    }
    if (!stvoData.inspectionDate) {
        profil.problempunkte.push({ bereich: "Ladungssicherung StVO", meldung: "Prüfdatum der Ladungssicherung fehlt.", schweregrad: "niedrig" });
        profil.gesamtScore -= 2;
    }
}
