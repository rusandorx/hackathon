import { FC } from 'react'

import HeroImg from '../../assets/HeroImage.png'

import SectionWrapper from '../../hocs/SectionWrapper'

import styles from './index.module.scss'

const Hero: FC = () => (
	<section className='min-h-screen mt-24 text-secondary'>
		<div className='flex items-center justify-between container mx-auto px-4 md:px-8 xl:px-16'>
			<div className='flex-grow max-w-4xl'>
				<h1 className='font-black text-primary text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight'>
					Сканирование портов и выявление уязвимостей
				</h1>
				<ul className={styles.ul}>
					<li>Быстрая проверка открытых портов</li>
					<li>Выявление потенциальных угроз</li>
					<li>Удобство использования</li>
					<li>Безопасность вашей сети</li>
				</ul>
				<p className='font-medium max-w-xl lg:max-w-3xl text-span text-sm md:text-base xl:text-lg mt-4'>
					Быстрое и эффективное сканирование открытых портов
					IP-адреса. Наш инструмент поможет вам выявить
					уязвимости и обеспечить безопасность вашей сети.
				</p>
				<a
					href='#main'
					className='inline-block text-xl font-bold px-6 py-3 mt-8 text-white border border-primary bg-primary hover:bg-transparent hover:text-primary rounded-md transition duration-150 ease-in-out'>
					Начать сканирование
				</a>
			</div>
			<img
				className='max-w-[40%] w-[100%] hidden lg:block'
				src={HeroImg}
			/>
		</div>
	</section>
)

const HeroSection = SectionWrapper(Hero, 'hero')

export default HeroSection
