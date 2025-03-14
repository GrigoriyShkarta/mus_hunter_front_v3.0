import { getUser } from '@/api/user/route'
import Edit from '@/components/common/Edit'
import { ModalType } from '@/lib/constants'
import { Stack, Typography } from '@mui/material'

export default async function MainInfo() {
	const user = await getUser()

	console.log('check', user)

	return (
		<Stack padding={'60px 34px 34px'} position={'relative'}>
			<Edit id={user?.id} isUser type={ModalType.UserMain} />
			<Stack>
				<Typography variant='h1'>
					{user?.firstName} {user?.lastName}
				</Typography>
			</Stack>
		</Stack>
	)
}
