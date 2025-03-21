import Edit from '@/components/common/Edit'
import { ModalType } from '@/lib/constants'
import { IUser } from '@/lib/globalTypes'
import { getUkrainianYears } from '@/lib/helpers'
import { Chip, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { getLocale } from 'next-intl/server'

interface Props {
	profile: IUser
}

export default async function MainInfo({ profile }: Props) {
	const locale = getLocale()

	const age = dayjs().diff(dayjs(profile?.age), 'year')
	const yearsText = (await locale) === 'ua' ? getUkrainianYears(age) : 'years'

	return (
		<Stack
			padding={'60px 16px 16px'}
			position={'relative'}
			border={'1px solid'}
			borderTop={'none'}
			borderBottom={'none'}
		>
			<Edit
				id={profile?.id}
				isUser
				type={ModalType.UserMain}
				positionAbsolute
			/>
			<Stack gap={1}>
				<Typography variant='h1'>
					{profile?.firstName} {profile?.lastName}
				</Typography>

				<Stack direction={'row'} gap={1}>
					{profile?.skills?.map(skill => (
						<Chip key={skill.id} label={skill.skill.name} color='secondary' />
					))}
				</Stack>

				<Stack direction={'row'} gap={1}>
					{profile?.styles?.map(style => (
						<Chip key={style.id} label={style.name} color='primary' />
					))}
				</Stack>

				<Stack direction={'row'} gap={1}>
					{profile.city?.name && (
						<>
							<Typography>{profile?.city?.name}</Typography>
							<Divider orientation='vertical' flexItem />
						</>
					)}
					{profile?.age && (
						<>
							<Typography>{`${age} ${yearsText}`}</Typography>
							<Divider orientation='vertical' flexItem />
						</>
					)}

					<Typography>{profile?.telephone}</Typography>
				</Stack>

				<Typography>{profile?.description}</Typography>
			</Stack>
		</Stack>
	)
}
