// import { downloadPDF } from './libs/pdf'
import { Provider } from 'react-redux'

import { store } from './store'

import Hero from './components/Hero'
import Main from './components/main'

const App = () => (
	<Provider store={store}>
		<Hero />
		<Main />
	</Provider>
)
{
	/* <button onClick={downloadPDF}>Download</button> */
}

export default App
