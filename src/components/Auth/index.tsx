import { Stack } from '@mui/material'
import Description from './component/Description'
import Form from './component/Form/'

export default function AuthPage() {
	return (
		<Stack
			sx={{
				height: 'calc(100vh - 96px)',
				alignContent: 'center',
				flexDirection: { xs: 'column-reverse', md: 'row' },
				gap: 2,
			}}
		>
			<Description />
			<Form />
		</Stack>
	)
}
