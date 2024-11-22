import { type FC } from 'react'

import { Input } from '../'

const InputForm: FC = () => {
	return (
		<form className='flex flex-col items-center justify-center rounded-md p-4'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex flex-col items-center flex-grow gap-2'>
					<Input />
					<button
						type='submit'
						className='ml-2 px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-md transition duration-150 ease-in-out'>
						Сканировать
					</button>
				</div>
				{/* <div className='flex flex-col items-center flex-grow gap-2'>
					<Input />
					<button
						type='submit'
						className='px-4 py-2 text-primary hover:text-white border border-primary hover:bg-primary font-medium rounded-md transition duration-150 ease-in-out'>
						Сканировать
					</button>
				</div> */}
			</div>
		</form>
	)
}

export default InputForm
