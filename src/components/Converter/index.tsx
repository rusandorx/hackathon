import { ChangeEvent, FC, useCallback, useRef } from 'react'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { debounce } from 'lodash'

import { ipPattern } from '../../utils'
import { chechIpPattern } from '../../utils/regEx'

// interface IState {
// 	ip: string
// 	domen: string
// }

const Converter: FC = () => {
	// const [state, setState] = useState<IState>({
	// 	ip: '172.217.215.102',
	// 	domen: 'google.com',
	// })

	const ipRef = useRef<HTMLInputElement>()
	const domenRef = useRef<HTMLInputElement>()

	const submitIp = useCallback(
		debounce((ip: string) => {
			// console.log(ip)
			//TODO fetch
			// const data = fetch()
			// domenRef.current.value = data
		}, 1000),
		[],
	)

	const submitDomen = useCallback(
		debounce((domen: string) => {
			// console.log(domen)
			//TODO fetch
			// const data = fetch()
			// ipRef.current.value = data
			// ipRef.current.value = ip
		}, 1000),
		[],
	)

	const ipChangeHandler = (
		e: ChangeEvent<HTMLInputElement>,
	): void => {
		// setState(prev => ({ ...prev, ip: e.target.value }))
		if (!ipRef.current || !chechIpPattern(ipRef.current.value))
			return
		submitIp(ipRef.current?.value)
	}

	const domenChangeHandler = (
		e: ChangeEvent<HTMLInputElement>,
	): void => {
		// setState(prev => ({ ...prev, domen: e.target.value }))
		submitDomen(domenRef.current?.value)
	}

	return (
		<div className='flex items-center gap-2 md:gap-4'>
			<div className='flex flex-col max-w-[45%]'>
				<span className='text-sm mb-1'>Домен</span>
				<input
					onChange={domenChangeHandler}
					defaultValue={'google.com'}
					ref={domenRef}
					className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2'
				/>
			</div>
			<FaArrowRightArrowLeft className='mt-6 flex-shrink-0' />
			<div className='flex flex-col max-w-[45%]'>
				<span className='text-sm mb-1'>Ip</span>
				<input
					onChange={ipChangeHandler}
					defaultValue={'172.217.215.102'}
					pattern={ipPattern}
					ref={ipRef}
					className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2'
				/>
			</div>
		</div>
	)
}
export default Converter
