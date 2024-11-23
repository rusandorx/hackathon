import { FC } from 'react'

import SectionWrapper from '../../hocs/SectionWrapper'

import { InputForm } from '../'
import ScanView from '../ScanView'
import Converter from '../Converter'

const mainPorts = [
	{ id: 0, content: '21 File Transfer (FTP)' },
	{ id: 1, content: '22 Secure Shell (SSH)' },
	{ id: 2, content: '23 Telnet' },
	{ id: 3, content: '25 Mail (SMTP)' },
	{ id: 4, content: '80 Web (HTTP)' },
	{ id: 5, content: '110 Mail (POP3)' },
	{ id: 6, content: '143 Mail (IMAP)' },
	{ id: 7, content: '443 SSL/TLS (HTTPS)' },
	{ id: 8, content: '445 Microsoft (SMB)' },
	{ id: 9, content: '3389 Remote (RDP)' },
]

const PortCard: FC<{ content: string }> = ({ content }) => {
	return (
		<div className='py-0.5 px-1.5 rounded-lg text-sm font-light bg-slate-500/30 cursor-pointer hover:bg-slate-500/40 transition-colors'>
			{content}
		</div>
	)
}

const Main: FC = () => {
	return (
		<main className='min-h-screen max-w-5xl mx-auto mt-8 px-4 flex flex-col items-center justify-start'>
			<div className='text-secondary container w-full bg-white flex flex-col rounded-xl shadow p-4'>
				<h2 className='text-2xl font-semibold mt-4'>
					Nmap Online Port Scanner
				</h2>
				<hr className='my-4' />
				<div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
					<p className=''>
						Выполните бесплатное сканирование портов, чтобы
						проверить любой IP-адрес и протестировать 10 общих
						TCP-портов с включенной версией обнаружения Nmap
						(-sV). Это быстрый и эффективный способ выявления
						уязвимостей в вашей сети.
					</p>
					<div>
						<span className='text-span text-sm'>
							Основные порты:
						</span>
						<div className='flex flex-wrap gap-2 mt-2'>
							{mainPorts.map(({ id, content }) => (
								<PortCard key={id} content={content} />
							))}
						</div>
					</div>
				</div>
				<hr className=' my-4' />
				<p className='text-md sm:text-lg mb-4'>
					Нужно конвертировать домен в ip или наоборот?
				</p>
				<Converter />

				<hr className='my-4' />
				<InputForm />
			</div>
		</main>
	)
}

const MainSection = SectionWrapper(Main, 'main')

export default MainSection
