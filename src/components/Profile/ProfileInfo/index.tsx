import { Stack } from '@mui/material'
import Banner from './Banner'
import MainInfo from './MainInfo'
import Navigate from './Navs/Tabs'
import { IUser } from '@/lib/globalTypes'

interface Props {
	profile: IUser
}

export default async function ProfileInfo({ profile }: Props) {
	return (
		<Stack>
			<Banner profile={profile} />
			<MainInfo profile={profile} />
			<Navigate profile={profile} />
		</Stack>
	)
}
