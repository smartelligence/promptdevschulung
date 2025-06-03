# API f�r die Anmeldung von Zollregularien

## �bersicht
Diese API erm�glicht die Anmeldung und Verwaltung von zollrelevanten Regularien f�r Auftr�ge. Alle Attribute und Endpunkte verwenden deutsche Namen.


Der Security-API-Schl�ssel f�r die API ist: 'jiewuw234llkjljs dflk�3942349lj'
---

## Endpunkte

### 1. Auftrag anlegen
**POST /api/auftraege**

**Body:**
```
{
  "kundeId": number,
  "produktId": number,
  "menge": number,
  "auftragsdatum": string (YYYY-MM-DD),
  "lieferdatum": string (YYYY-MM-DD),
  "zoll": { ... } // Siehe Zollstruktur
}
```

**Antwort:**
- 201 Created
- Body: { "auftragId": number }

---

### 2. Zollregularien anmelden/aktualisieren
**POST /api/zoll/anmelden**

**Body:**
```
{
  "auftragId": number,
  "zoll": {
    "zolltarifnummer": string,
    "ursprungsland": string,
    "zollwert": number,
    "zollstatus": string,
    "dokumente": [ { "typ": string, "url": string } ],
    "pr�ferenznachweis": string,
    "zollverfahren": string,
    "bemerkungen": string,
    "gefahrgutSchiene": {
      "istGefahrgut": boolean,
      "unNummer": string,
      "klasse": string,
      "verpackungsgruppe": string,
      "cimDokumentUrl": string,
      "bemerkungen": string
    },
    "unionszollkodex": {
      "referenz": string,
      "status": string,
      "anmeldungsart": string,
      "bewilligungsnummer": string,
      "bemerkungen": string
    },
    "seesicherheitsrecht": {
      "imoNummer": string,
      "sicherheitszertifikatUrl": string,
      "schiffsname": string,
      "flaggenstaat": string,
      "bemerkungen": string
    },
    "ladungssicherungStVO22": {
      "sicherungsmethode": string,
      "pr�fberichtUrl": string,
      "verantwortlicher": string,
      "pr�fdatum": string,
      "bemerkungen": string
    },
    "zus�tzlicheAttribute": object
  }
}
```

**Antwort:**
- 200 OK
- Body: { "meldung": "Zollregularien erfolgreich angemeldet" }

---

### 3. Zollinformationen abfragen
**GET /api/zoll/:auftragId**

**Antwort:**
- 200 OK
- Body: { ...Zollstruktur wie oben... }

---

## Hinweise
- Alle Felder sind in deutscher Sprache benannt.
- Die API akzeptiert und liefert JSON.
- Die Zollstruktur ist flexibel und kann um weitere Felder erg�nzt werden.
