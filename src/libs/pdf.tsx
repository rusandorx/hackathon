import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export const createPDF = (ip: string, portType: string, ports?: string) => {
  // Создаем новый документ PDF
  const doc = new jsPDF();

  // Добавляем текст в документ
  doc.text("Scan Report", 10, 10);
  doc.text(`IP: ${ip}`, 10, 20);
  doc.text(`Port Type: ${portType}`, 10, 30);
  if (ports) {
    doc.text(`Ports: ${ports}`, 10, 40);
  }

  return doc;
};

export const downloadPDF = (ip: string, portType: string, ports?: string) => {
  // Генерируем данные документа в формате Uint8Array
  const data = createPDF(ip, portType, ports).output("arraybuffer");

  // Скачиваем файл
  saveAs(new Blob([data], { type: "application/pdf" }), "scan_report.pdf");
};