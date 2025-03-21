'use client'

import Edit from '@/components/common/Edit'
import { Language, ModalType } from '@/lib/constants'
import { IUser } from '@/lib/globalTypes'
import { getUkrainianYears } from '@/lib/helpers'
import {
	Button,
	Grid,
	IconButton,
	Slider,
	Stack,
	Typography,
} from '@mui/material'
import { TbTrashFilled } from 'react-icons/tb'
import { useLocale } from 'next-intl'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { apiDeleteData } from '@/lib/fetch'
import { URL } from '@/lib/apiURLs'
import useNotification from '@/hooks/useNotification'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

interface Props {
	profile: IUser
}

export default function Skills({ profile }: Props) {
	const user = useUserStore(state => state.user)
	const editRef = useRef<{ openModal: () => void }>(null)
	const locale = useLocale()
	const showNotification = useNotification()
	const router = useRouter()

	const handleEditClick = () => {
		if (editRef.current) {
			editRef.current.openModal()
		}
	}

	const deleteMutation = useMutation({
		mutationFn: async (id: number) => apiDeleteData(URL.ChangeUserSkill, id),
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

	if (profile?.skills?.length === 0) {
		return profile.id === user?.id ? (
			<>
				<Edit
					id={profile?.id}
					isUser
					type={ModalType.UserSkills}
					hiddenIcon
					ref={editRef}
				/>

				<Button
					variant='contained'
					sx={{ width: 'fit-content', margin: '0 auto' }}
					onClick={handleEditClick}
				>
					add new skills
				</Button>
			</>
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
		<Grid container spacing={2}>
			{profile?.skills?.map(skillObj => (
				<Grid item xs={12} sm={6} key={skillObj.id}>
					<Stack
						width={'100%'}
						sx={{
							padding: 2,
							border: '1px solid #e0e0e0',
							borderRadius: 2,
						}}
					>
						<Stack direction={'row'} gap={1} alignItems={'center'}>
							<Typography fontWeight={'bold'} fontSize={'1.2rem'}>
								{skillObj.skill.name}
							</Typography>
							{profile.id === user?.id && (
								<>
									<Edit
										isUser
										type={ModalType.UserSkills}
										id={profile.id}
										selectedObject={skillObj.id}
									/>
									<IconButton
										size='small'
										onClick={() => deleteMutation.mutate(skillObj.id)}
									>
										<TbTrashFilled size={24} />
									</IconButton>
								</>
							)}
						</Stack>
						<Stack direction={'row'} gap={1}>
							<Slider
								value={skillObj.experience}
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
								{skillObj.experience > 0 &&
									skillObj.experience < 11 &&
									`${skillObj.experience} `}
								{yearsText(skillObj.experience)}
							</Typography>
						</Stack>
						<Typography>{skillObj?.description}</Typography>
					</Stack>
				</Grid>
			))}

			{profile.id === user?.id && (
				<Grid item xs={12} sm={6}>
					<Stack
						width={'100%'}
						gap={1}
						sx={{
							padding: 2,
							border: '1px solid #e0e0e0',
							borderRadius: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Edit
							id={profile?.id}
							isUser
							type={ModalType.UserSkills}
							hiddenIcon
							ref={editRef}
						/>
						<Button
							variant='contained'
							sx={{ width: 'fit-content', margin: '0 auto' }}
							onClick={handleEditClick}
						>
							Add new skills
						</Button>
					</Stack>
				</Grid>
			)}
		</Grid>
	)
}
