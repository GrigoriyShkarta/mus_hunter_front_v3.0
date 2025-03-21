import { Avatar, Stack } from '@mui/material'
import Links from './Links'
import { IUser } from '@/lib/globalTypes'

interface Props {
	profile: IUser
}

export default async function Banner({ profile }: Props) {
	return (
		<Stack
			bgcolor={'#212121'}
			height={200}
			width={'100%'}
			borderRadius={'.5rem .5rem 0 0'}
			position={'relative'}
		>
			<Avatar
				src={profile?.avatar}
				sx={{
					width: '180px',
					height: '180px',
					position: 'absolute',
					bottom: '-50px',
					left: '34px',
					border: '2px solid white',
				}}
			/>

			<Links />
		</Stack>
	)
}
