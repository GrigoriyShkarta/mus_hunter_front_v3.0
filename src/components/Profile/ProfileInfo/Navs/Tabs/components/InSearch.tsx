import Edit from '@/components/common/Edit'
import useNotification from '@/hooks/useNotification'
import { URL } from '@/lib/apiURLs'
import { Language, ModalType } from '@/lib/constants'
import { apiDeleteData } from '@/lib/fetch'
import { IUser } from '@/lib/globalTypes'
import { getUkrainianYears } from '@/lib/helpers'
import { useUserStore } from '@/store/userStore'
import {
	Button,
	Chip,
	Grid,
	IconButton,
	Slider,
	Stack,
	Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { TbTrashFilled } from 'react-icons/tb'

interface Props {
	profile: IUser
}

export default function InSearch({ profile }: Props) {
	const user = useUserStore(state => state.user)
	const locale = useLocale()
	const editRefBand = useRef<{ openModal: () => void }>(null)
	const editRefMusician = useRef<{ openModal: () => void }>(null)
	const showNotification = useNotification()
	const router = useRouter()

	const handleEditSearchBandClick = () => {
		if (editRefBand.current) {
			editRefBand.current.openModal()
		}
	}

	const handleEditSearchMusicianClick = () => {
		if (editRefMusician.current) {
			editRefMusician.current.openModal()
		}
	}

	const deleteMutation = useMutation({
		mutationFn: async ({ id, isBand }: { id: number; isBand: boolean }) => {
			if (isBand) {
				return apiDeleteData(URL.ChangeUserSearchBand, id)
			} else {
				return apiDeleteData(URL.ChangeUserSearchMusician, id)
			}
		},
		onSuccess: result => {
			if (result) {
				router.refresh()
				showNotification('Successfully updated', 'success')
			}
		},
		onError: responseError => {
			// const status = responseError?.status
			// const { error } = responseError.response?.data
			// if (status === 422) {
			// 	handleErrors(error, status)
			// } else {
			showNotification(` Something went wrong`, 'error')
			// }
		},
	})

	if (
		!profile?.inSearchBand &&
		profile.inSearchMusician?.length === 0 &&
		profile.id === user?.id
	) {
		return profile.id === user?.id ? (
			<Stack direction={'row'} gap={1} width={'fit-content'} margin={'0 auto'}>
				<>
					<Edit
						id={profile?.id}
						isUser
						type={ModalType.UserInSearchBand}
						hiddenIcon
						ref={editRefBand}
					/>
					<Button
						variant='contained'
						sx={{ width: 'fit-content', margin: '0 auto' }}
						onClick={handleEditSearchBandClick}
					>
						in search band
					</Button>
				</>

				<>
					<Edit
						id={profile?.id}
						isUser
						type={ModalType.InSearchMusician}
						hiddenIcon
						ref={editRefMusician}
					/>
					<Button
						variant='contained'
						sx={{ width: 'fit-content', margin: '0 auto' }}
						onClick={handleEditSearchMusicianClick}
					>
						in search musician
					</Button>
				</>
			</Stack>
		) : (
			<Typography>User don't have skills</Typography>
		)
	}

	const yearsText = (years: number) => {
		if (years === 11) {
			return locale === Language.EN ? 'more 10 years' : 'більше 10 років'
		} else {
			return getUkrainianYears(years)
		}
	}

	return (
		<Stack gap={1}>
			{user?.inSearchBand && (
				<Stack
					width={'100%'}
					gap={0.5}
					sx={{
						padding: 2,
						border: '1px solid #e0e0e0',
						borderRadius: 2,
					}}
				>
					<Stack direction={'row'} gap={1} alignItems={'center'}>
						<Typography fontWeight={'bold'} fontSize={'1.2rem'}>
							В пошуках гурту
						</Typography>
						{profile.id === user?.id && (
							<>
								<Edit
									isUser
									type={ModalType.UserInSearchBand}
									id={profile.id}
									selectedObject={user.inSearchBand.id}
								/>
								<IconButton
									size='small'
									onClick={() =>
										deleteMutation.mutate({
											id: user.inSearchBand!.id,
											isBand: true,
										})
									}
								>
									<TbTrashFilled size={24} />
								</IconButton>
							</>
						)}
					</Stack>

					<Stack direction={'row'} gap={1} flexWrap={'wrap'}>
						{user.inSearchBand?.styles.map(style => (
							<Chip key={style.id} label={style.name} color='primary' />
						))}
					</Stack>

					<Stack direction={'row'} gap={1} alignItems={'center'}>
						<Typography>В ролі</Typography>
						<Chip label={user.inSearchBand.skill.name} color='secondary' />
					</Stack>

					<Typography variant='h5' marginTop={4}>
						Опис
					</Typography>

					<Typography
						dangerouslySetInnerHTML={{
							__html: user.inSearchBand?.description || '',
						}}
					/>
				</Stack>
			)}

			{user?.inSearchMusician?.map(item => (
				<Stack
					key={item.id}
					width={'100%'}
					gap={0.5}
					sx={{
						padding: 2,
						border: '1px solid #e0e0e0',
						borderRadius: 2,
					}}
				>
					<Stack direction={'row'} gap={1} alignItems={'center'}>
						<Typography fontWeight={'bold'} fontSize={'1.2rem'}>
							В пошуках
						</Typography>
						<Chip label={item.skill.name} color='secondary' />
						{profile.id === user?.id && (
							<>
								<Edit
									isUser
									type={ModalType.InSearchMusician}
									id={profile.id}
									selectedObject={item.id}
								/>
								<IconButton
									size='small'
									onClick={() =>
										deleteMutation.mutate({ id: item.id, isBand: false })
									}
								>
									<TbTrashFilled size={24} />
								</IconButton>
							</>
						)}
					</Stack>
					<Stack direction={'row'} gap={1} maxWidth={'518px'}>
						<Slider
							value={item.experience}
							min={0}
							max={11}
							disabled
							sx={{
								'& .MuiSlider-thumb': {
									display: 'none',
								},
								'&.Mui-disabled .MuiSlider-track': {
									backgroundColor: '#ffb300',
								},
							}}
						/>
						<Typography whiteSpace={'nowrap'}>
							{item.experience > 0 &&
								item.experience < 11 &&
								`${item.experience} `}
							{yearsText(item.experience)}
						</Typography>
					</Stack>
					<Stack direction={'row'} gap={1} flexWrap={'wrap'}>
						{item.styles?.map(style => (
							<Chip key={style.id} label={style.name} color='primary' />
						))}
					</Stack>
					<Typography variant='h5' marginTop={4}>
						Опис
					</Typography>

					<Typography
						dangerouslySetInnerHTML={{
							__html: item?.description || '',
						}}
					/>
				</Stack>
			))}

			{profile.id === user?.id && (
				<Stack
					direction={'row'}
					width={'fit-content'}
					margin={'0 auto'}
					gap={1}
				>
					<Edit
						id={profile?.id}
						isUser
						type={ModalType.InSearchMusician}
						hiddenIcon
						ref={editRefMusician}
					/>
					<Button
						variant='contained'
						sx={{ width: 'fit-content', margin: '0 auto' }}
						onClick={handleEditSearchMusicianClick}
					>
						In search musician
					</Button>
					{!user?.inSearchBand && (
						<>
							<Edit
								id={profile?.id}
								isUser
								type={ModalType.UserInSearchBand}
								hiddenIcon
								ref={editRefBand}
							/>
							<Button
								variant='contained'
								sx={{ width: 'fit-content', margin: '0 auto' }}
								onClick={handleEditSearchBandClick}
							>
								in serach band
							</Button>
						</>
					)}
				</Stack>
			)}
		</Stack>
	)
}
