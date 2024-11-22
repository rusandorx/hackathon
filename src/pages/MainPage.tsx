import { type FC } from 'react'

import { MainLayout } from '../layouts'

import { Hero, Main } from '../components'

const MainPage: FC = () => {
	return (
		<MainLayout>
			<Hero />
			<Main />
		</MainLayout>
	)
}
export default MainPage
