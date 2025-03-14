import { Stack } from '@mui/material'
import Banner from './Banner'
import MainInfo from './MainInfo'

export default function ProfileInfo() {
	console.log('is server')

	return (
		<Stack>
			<Banner />
			<MainInfo />
		</Stack>
	)
}
