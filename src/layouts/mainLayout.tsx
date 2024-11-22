import { memo } from 'react'

import Header from '../components/Header'

//TODO Типизировать
const MainLayout = memo(
	({ children }: { children: unknown }) => {
		return (
			<>
				<Header />
				{children}
				<footer />
			</>
		)
	},
)

export default MainLayout
