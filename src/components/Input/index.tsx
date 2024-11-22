import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInputValue } from '../../store/slices/globalSlice'
import { RootState } from '../../store'

const Input: FC = () => {
	const dispatch = useDispatch()

	const data = useSelector(
		(state: RootState) => state.globalSlice.inputValue,
	)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		dispatch(setInputValue(e.target.value))
	}

	return (
		<>
			<label htmlFor='ip-address' className='font-semibold mr-2'>
				Введите IP адрес
			</label>
			<input
				type='text'
				id='ip-address'
				value={data}
				onChange={handleChange}
				className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-md px-3 py-2 flex-1'
			/>
		</>
	)
}

export default Input
