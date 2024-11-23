import { FC } from 'react'
import SectionWrapper from '../../hocs/SectionWrapper'

const Info: FC = () => {
	return (
		<section className='mt-24 mb-12 text-secondary'>
			<div className='container mx-auto px-8 md:px-12 xl:px-16'>
				<h3 className='font-black text-primary text-2xl sm:text-3xl md:text-3xl leading-tight'>
					Как пользоваться нашим продуктом?
				</h3>
				<p className='mt-2 max-w-[500px]'>
					Воспользуйтесь настройками и введите желаемый адрес в
					одном из форматах, предложенных ниже:
				</p>
				<div className='mt-8 flex items-center bg-white rounded-md shadow p-2'>
					<table className='info__table w-full table-fixed'>
						<thead className='text-lg border-b'>
							<tr>
								<th>Способ задания</th>
								<th>Описание</th>
								<th>Пример</th>
							</tr>
						</thead>
						<tbody className='text-center bg-white dark:bg-slate-800'>
							<tr>
								<td>
									<strong className=''>IP-адрес</strong>
								</td>
								<td>Укажите конкретный IP-адрес</td>
								<td>
									<code>192.168.0.1</code>
								</td>
							</tr>
							<tr>
								<td>
									<strong className=''>
										Перечисление IP-адресов
									</strong>
								</td>
								<td>
									Перечислите несколько IP-адресов через запятую
								</td>
								<td>
									<code>192.168.0.1,192.168.0.2</code>
								</td>
							</tr>
							<tr>
								<td>
									<strong className=''>
										Диапазон IP-адресов
									</strong>
								</td>
								<td>
									Задайте диапазон IP-адресов через двоеточие
								</td>
								<td>
									<code>192.168.0.0:192.168.0.255</code>
								</td>
							</tr>
							<tr>
								<td>
									<strong className=''>CIDR-нотация</strong>
								</td>
								<td>
									Используйте CIDR-нотацию для сканирования
									подсетей
								</td>
								<td>
									<code>192.168.0.0/24</code>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<h4 className='text-xl font-semibold mt-8'>
					Какие источники можно почитать?
				</h4>
				<ul className='flex flex-col pl-2 mt-2 gap-3'>
					<li>
						<a
							target='_blank'
							className='text-md text-blue-500 hover:underline'
							href='https://nmap.org/man/ru/index.html'>
							Официальная документация Nmap
						</a>
					</li>
					<li>
						<a
							target='_blank'
							className='text-md text-blue-500 hover:underline'
							href='https://habr.com/ru/articles/88064/'>
							Книга «Nmap Network Scanning»
						</a>
					</li>
					<li>
						<a
							target='_blank'
							className='text-md text-blue-500 hover:underline'
							href='https://securityonion.net/'>
							Веб-сайт Security Onion
						</a>
					</li>
				</ul>
			</div>
		</section>
	)
}
const infoSection = SectionWrapper(Info, 'info')

export default infoSection
