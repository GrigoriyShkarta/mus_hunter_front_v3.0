import { getUser } from '@/api/user/route'
import { Avatar, Stack } from '@mui/material'

export default async function Banner() {
	const user = await getUser()

	return (
		<Stack
			bgcolor={'#212121'}
			height={200}
			width={'100%'}
			borderRadius={'.5rem .5rem 0 0'}
			position={'relative'}
		>
			<Avatar
				src={user?.avatar}
				sx={{
					width: '180px',
					height: '180px',
					position: 'absolute',
					bottom: '-50px',
					left: '34px',
					border: '2px solid white',
				}}
			/>
		</Stack>
	)
}
