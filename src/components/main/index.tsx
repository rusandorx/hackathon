import { FC } from 'react'

import SectionWrapper from '../../hocs/SectionWrapper'

import InputForm from '../InputForm'

const mainPorts = [
	'21 File Transfer (FTP)',
	'22 Secure Shell (SSH)',
	'23 Telnet',
	'25 Mail (SMTP)',
	'80 Web (HTTP)',
	'110 Mail (POP3)',
	'143 Mail (IMAP)',
	'443 SSL/TLS (HTTPS)',
	'445 Microsoft (SMB)',
	'3389 Remote (RDP)',
]

const PortCard: FC<{ content: string }> = ({ content }) => {
	return (
		<div className='py-0.5 px-1.5 rounded-lg text-sm font-light bg-slate-500/30 cursor-pointer hover:bg-slate-500/40 hover:bg-primary transition-colors'>
			{content}
		</div>
	)
}

const Main: FC = () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-start pt-16'>
			<div className='text-secondary container w-full bg-white flex flex-col rounded-xl shadow p-4'>
				<h2 className='text-2xl font-semibold my-4'>
					Nmap Online Port Scanner
				</h2>
				<hr />
				<div className='mt-4 grid grid-cols-2'>
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
							{mainPorts.map(port => (
								<PortCard content={port} />
							))}
						</div>
					</div>
				</div>
				<hr className='my-4' />
				<InputForm />
			</div>
		</main>
	)
}

const MainSection = SectionWrapper(Main, 'main')

export default MainSection
