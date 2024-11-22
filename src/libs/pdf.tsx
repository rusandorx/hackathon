import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

export const createPDF = () => {
	// Создаем новый документ PDF
	const doc = new jsPDF()

	// Добавляем текст в документ
	doc.text('Example text', 10, 10)

	return doc
}

export const downloadPDF = () => {
	// Генерируем данные документа в формате Uint8Array
	const data = createPDF().output('arraybuffer')

	// Скачиваем файл
	saveAs(
		new Blob([data], { type: 'application/pdf' }),
		'example.pdf',
	)
}
