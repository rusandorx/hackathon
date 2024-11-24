import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import { ScanData } from "../store/slices/scanSlice";

export const createPDF = (scanData: ScanData) => {
  const doc = new jsPDF();

  if (scanData) {
    doc.text(`Task ID: ${scanData.task_id}`, 10, 10);
    doc.text(`Status: ${scanData.end ? "Completed" : "In Progress"}`, 10, 20);

    scanData.ips.forEach((ipData, index) => {
      const yOffset = 30 + index * 60;
      doc.text(`IP: ${ipData.ip}`, 10, yOffset);
      doc.text(`PTR: ${ipData.ptr}`, 10, yOffset + 10);

      const tableData = ipData.ports.open.map(port => [
        port.port,
        port.protocol ?? "N/A",
        port.service ?? "N/A",
        port.version ?? "N/A",
        port.vulnerabilities?.map(vuln => vuln.title).join(", ") ?? "N/A",
        port.vulnerabilities?.map(vuln => vuln.description).join(", ") ?? "N/A",
        port.vulnerabilities?.map(vuln => vuln.severity).join(", ") ?? "N/A"
      ]);

      doc.autoTable({
        startY: yOffset + 20,
        head: [['Port', 'Protocol', 'Service', 'Version', 'Vulnerabilities', 'Description', 'Severity']],
        body: tableData
      });

      doc.text(`Closed Ports: ${ipData.ports.closed.join(", ")}`, 10, yOffset + 50);
    });
  } else {
    doc.text("No scan data available", 10, 10);
  }

  return doc;
};

export const downloadPDF = (scanData: ScanData) => {
  const data = createPDF(scanData).output("arraybuffer");
  saveAs(new Blob([data], { type: "application/pdf" }), "scan_report.pdf");
};