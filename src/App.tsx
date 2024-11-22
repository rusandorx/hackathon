import { downloadPDF } from './libs/pdf'

import './App.css'

function App() {
	return (
		<>
			<button onClick={downloadPDF}>Download</button>
		</>
	)
}

export default App
