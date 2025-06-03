export const initialCustomers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', street: 'Musterweg 1', plz: '12345', city: 'Musterstadt', website: 'https://alice.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com', street: 'Beispielstr. 2', plz: '54321', city: 'Beispielstadt', website: 'https://bob.com' },
];

export const initialProducts = [
  { id: 1, name: 'Produkt A', price: 10 },
  { id: 2, name: 'Produkt B', price: 20 },
  { id: 3, name: 'Produkt C', price: 30 },
];

// Order: Basisdaten für alle Aufträge
// customs: optionale Unterstruktur für zollrelevante Aufträge
// {
//   id, customerId, productId, quantity, orderDate, deliveryDate,
//   customs?: {
//     tariffNumber: string, // Zolltarifnummer
//     originCountry: string, // Ursprungsland
//     customsValue: number, // Zollwert
//     customsStatus: string, // Status (z.B. "angemeldet", "abgefertigt")
//     documents: Array<{ type: string, url: string }>, // Dokumente
//     preferenceCertificate: string, // Präferenznachweis (z.B. EUR.1, Form A)
//     procedureCode: string, // Zollverfahren
//     remarks: string, // Bemerkungen
//     additionalAttributes: object // Weitere Attribute (generisch)
//   }
// }
export const initialOrders = [
  { id: 1, customerId: 1, productId: 1, quantity: 2, orderDate: '2024-06-01', deliveryDate: '2024-06-05' },
  { id: 2, customerId: 2, productId: 2, quantity: 1, orderDate: '2024-06-02', deliveryDate: '2024-06-06',
    customs: {
      tariffNumber: '1234.56.78',
      originCountry: 'DE',
      customsValue: 100,
      customsStatus: 'angemeldet',
      documents: [
        { type: 'Rechnung', url: 'https://example.com/invoice.pdf' },
        { type: 'Frachtbrief', url: 'https://example.com/awb.pdf' }
      ],
      preferenceCertificate: 'EUR.1',
      procedureCode: '4000',
      remarks: 'Eilige Lieferung',
      additionalAttributes: {
        exportReason: 'Handelsware',
        insuranceValue: 120
      }
    }
  },
];
