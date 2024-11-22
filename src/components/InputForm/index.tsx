import Input from '../Input'

const InputForm = () => {
	return (
		<form className='flex bg-white flex-col items-center justify-center rounded-md p-4 shadow-md'>
			<Input />
			<button
				type='submit'
				className='ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out'>
				Сканировать
			</button>
		</form>
	)
}

export default InputForm
