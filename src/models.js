// Customer: Repräsentiert einen Kunden
export class Customer {
  constructor({ id, name, email, street, plz, city, website, kundennummer, erstelltAm, geaendertAm, status }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.street = street;
    this.plz = plz;
    this.city = city;
    this.website = website;
    // Standard-Felder, die nicht angezeigt werden sollen
    this.kundennummer = kundennummer || null; // z.B. String oder Number
    this.erstelltAm = erstelltAm || null;     // z.B. ISO-Datum
    this.geaendertAm = geaendertAm || null;   // z.B. ISO-Datum
    this.status = status || 'aktiv';          // z.B. 'aktiv', 'inaktiv'
  }
}

// Product: Repräsentiert ein Produkt
export class Product {
  constructor({ id, name, price }) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Gefahrentransport Schiene (CIM)
export class RailDangerousGoodsCIM {
  constructor({
    isDangerousGoods = false,
    unNumber = "",
    classCode = "",
    packagingGroup = "",
    cimDocumentUrl = "",
    remarks = ""
  }) {
    this.isDangerousGoods = isDangerousGoods;
    this.unNumber = unNumber;
    this.classCode = classCode;
    this.packagingGroup = packagingGroup;
    this.cimDocumentUrl = cimDocumentUrl;
    this.remarks = remarks;
  }
}

// Unionszollkodex (UCC)
export class UnionCustomsCode {
  constructor({
    codeReference = "",
    complianceStatus = "",
    declarationType = "",
    authorisationNumber = "",
    remarks = ""
  }) {
    this.codeReference = codeReference;
    this.complianceStatus = complianceStatus;
    this.declarationType = declarationType;
    this.authorisationNumber = authorisationNumber;
    this.remarks = remarks;
  }
}

// Seesicherheitsrecht
export class MaritimeSafetyLaw {
  constructor({
    // imoNumber = "", 
    safetyCertificateUrl = "",
    vesselName = "",
    flagState = "",
    remarks = ""
  }) {
    // this.imoNumber = imoNumber; 
    this.safetyCertificateUrl = safetyCertificateUrl;
    this.vesselName = vesselName;
    this.flagState = flagState;
    this.remarks = remarks;
  }
}

// §22 StVO Ladungssicherung
export class CargoSecuringStVO22 {
  constructor({
    // securingMethod = "", 
    inspectionReportUrl = "",
    responsiblePerson = "",
    inspectionDate = "",
    remarks = ""
  }) {
    // this.securingMethod = securingMethod; 
    this.inspectionReportUrl = inspectionReportUrl;
    this.responsiblePerson = responsiblePerson;
    this.inspectionDate = inspectionDate;
    this.remarks = remarks;
  }
}

// Customs: Repräsentiert zollrelevante Informationen (generisch erweiterbar)
export class Customs {
  constructor({
    tariffNumber,
    originCountry,
    customsValue,
    customsStatus,
    documents = [],
    preferenceCertificate,
    procedureCode,
    remarks,
    additionalAttributes = {},
    railDangerousGoodsCIM,
    unionCustomsCode,
    maritimeSafetyLaw,
    cargoSecuringStVO22
  }) {
    this.tariffNumber = tariffNumber;
    this.originCountry = originCountry;
    this.customsValue = customsValue;
    this.customsStatus = customsStatus;
    this.documents = documents; // Array von { type, url }
    this.preferenceCertificate = preferenceCertificate;
    this.procedureCode = procedureCode;
    this.remarks = remarks;
    this.additionalAttributes = additionalAttributes;
    this.railDangerousGoodsCIM = railDangerousGoodsCIM; // RailDangerousGoodsCIM-Objekt
    this.unionCustomsCode = unionCustomsCode;           // UnionCustomsCode-Objekt
    this.maritimeSafetyLaw = maritimeSafetyLaw;         // MaritimeSafetyLaw-Objekt
    this.cargoSecuringStVO22 = cargoSecuringStVO22;     // CargoSecuringStVO22-Objekt
  }
}

// Order: Repräsentiert einen Auftrag, customs ist optional
export class Order {
  constructor({ id, customerId, productId, quantity, orderDate, deliveryDate, customs }) {
    this.id = id;
    this.customerId = customerId;
    this.productId = productId;
    this.quantity = quantity;
    this.orderDate = orderDate;
    this.deliveryDate = deliveryDate;
    this.customs = customs; // Customs-Objekt oder undefined
  }
}
