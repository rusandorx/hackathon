import { FC } from 'react'
import SectionWrapper from '../../hocs/SectionWrapper'

const Info: FC = () => {
	return <section className='min-h-screen'>Info</section>
}
const infoSection = SectionWrapper(Info, 'info')

export default infoSection
