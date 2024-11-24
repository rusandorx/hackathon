import jsPDF from "jspdf";
import { IpData, Port, ScanData } from "../store/slices/scanSlice";
// @ts-expect-error ffg
import { saveAs } from "file-saver";

export const createPDF = (scanData: ScanData) => {
  const doc = new jsPDF();
  let currentY = 10;

  if (scanData && scanData.ips) {
    scanData.ips.forEach((ipData: IpData) => {
      doc.text(`IP: ${ipData.ip}`, 10, currentY);
      currentY += 10;
      doc.text(`PTR: ${ipData.ptr || "Unknown"}`, 10, currentY);
      currentY += 10;

      const openPorts = ipData.ports.open;

      if (openPorts.length) {
        // Draw table header
        doc.text("Port", 10, currentY);
        doc.text("Protocol", 30, currentY);
        doc.text("Service", 60, currentY);
        doc.text("Version", 90, currentY);
        doc.text("Vulnerabilities", 120, currentY);
        currentY += 10;

        // Draw table rows
        openPorts.forEach((port: Port) => {
          doc.text(port.port.toString(), 10, currentY);
          doc.text(port.protocol || "N/A", 30, currentY);
          doc.text(port.service || "N/A", 60, currentY);
          doc.text(port.version || "N/A", 90, currentY);
          doc.text(
            port.vulnerabilities?.map((vul) => vul.title).join(", ") || "None",
            120,
            currentY,
          );
          currentY += 10;
        });
      }

      if (ipData.ports.closed.length) {
        doc.text(
          `Closed Ports: ${ipData.ports.closed.join(", ")}`,
          10,
          currentY,
        );
        currentY += 10;
      }

      currentY += 10; // Add some space before the next IP
    });
  } else {
    doc.text("No data", 10, currentY);
  }

  return doc;
};

export const downloadPDF = (scanData: ScanData) => {
  const data = createPDF(scanData).output("arraybuffer");
  saveAs(new Blob([data], { type: "application/pdf" }), "scan_report.pdf");
};