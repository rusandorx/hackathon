// import { downloadPDF } from './libs/pdf'
import { Provider } from 'react-redux'

import { store } from './store'

import { MainPage } from './pages/'

const App = () => (
	<Provider store={store}>
		<MainPage />
	</Provider>
)
{
	/* <button onClick={downloadPDF}>Download</button> */
}

export default App
