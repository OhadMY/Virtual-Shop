const PDFDocument = require("pdfkit");
const fs = require("fs");

function buildPDF(dataCallback, endCallback, invoiceData) {
  const invoice = invoiceData;

  const doc = new PDFDocument({ margin: 50 });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();

  function generateHeader(doc) {
    doc
      .image("./images/shop.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("MyStore", 110, 56)
      .fontSize(10)
      .moveDown();
  }

  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Order received successfully, Thank you for your business.",
        50,
        715,
        { align: "center", width: 500 }
      )
      .text("Generated by MyStore - Ohad Mor Yosef.", 50, 730, {
        align: "center",
        width: 500,
      });
  }

  function generateCustomerInformation(doc, invoice) {
    doc
      .fontSize(16)
      .text(`Order Receipt`, 50, 150, { align: "center", width: 500 })
      .fontSize(10)
      .text(`Delivery Date: ${invoice.deliveryDate}`, 50, 200)
      .text(`Name: ${invoice.firstName} ${invoice.lastName}`, 50, 215)
      .text(
        `Adress: ${invoice.deliveryCity}, ${invoice.deliveryStreet}`,
        50,
        230
      )
      .moveDown();
  }

  function generateTableRow(doc, y, c1, c2, c3, c4) {
    doc
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 180, y, { width: 90, align: "right" })
      .text(c3, 330, y, { width: 90, align: "right" })
      .text(c4, 0, y, { align: "right" });
  }

  function generateInvoiceTable(doc, invoice) {
    let i,
      invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Product Name",
      "Price",
      "Quantity",
      "Total Price"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.cartItems.length; i++) {
      const prod = invoice.cartItems[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        prod.prodName,
        prod.prodPrice + "$",
        prod.quantity,
        prod.Total + "$"
      );
      generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Total Price",
      invoice.totalPrice + "$"
    );
  }
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(570, y).stroke();
}

module.exports = { buildPDF };
