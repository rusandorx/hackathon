import { FC, useCallback, useRef } from 'react'

import Typewriter from 'typewriter-effect/dist/core'
import { ipPattern } from '../../utils/regEx'

const inputExamples = [
	'192.168.1.0',
	'Google.com',
	'0.0.0.0-255.255.255.255',
	'172.31.0.0/16',
]

const Input: FC = () => {
	const input = useRef<HTMLInputElement | null>(null)

	const customNodeCreator = useCallback((character: unknown) => {
		// Add character to input placeholder
		if (input.current?.placeholder) {
			input.current.placeholder =
				input.current.placeholder + character
		}

		// Return null to skip internal adding of dom node
		return null
	}, [])

	const onRemoveNode = useCallback(() => {
		if (input.current?.placeholder) {
			// Remove last character from input placeholder
			input.current.placeholder =
				input.current?.placeholder.slice(0, -1)
		}
	}, [])

	new Typewriter(null, {
		strings: inputExamples,
		autoStart: true,
		loop: true,
		delay: 75,
		onCreateTextNode: customNodeCreator,
		onRemoveNode: onRemoveNode,
	})

	return (
		<>
			<label htmlFor='ip-address' className='font-semibold mr-2'>
				Введите IP адрес
			</label>
			<input
				type='text'
				id='ip-address'
				ref={input}
				pattern={ipPattern}
				placeholder=' '
				name='ip'
				className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2'
				required
			/>
		</>
	)
}

export default Input
