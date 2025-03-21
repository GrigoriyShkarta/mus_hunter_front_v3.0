'use client'

import useNotification from '@/hooks/useNotification'
import { ICommonData } from '@/lib/globalTypes'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { ISkillsForm } from '../types'
import { useEffect } from 'react'
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { Field, Language } from '@/lib/constants'
import { useLocale, useTranslations } from 'next-intl'
import { getUkrainianYears } from '@/lib/helpers'
import { apiCreateData, apiUpdateData } from '@/lib/fetch'
import { URL } from '@/lib/apiURLs'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeUserSkillSchema } from './schema'
import { IUserSkillChanges } from './types'

interface Props {
	commonData: ICommonData
	selectedSkill?: number
	handleClose: () => void
}

export default function UserSkills({
	commonData,
	selectedSkill,
	handleClose,
}: Props) {
	const user = useUserStore(state => state.user)
	const showNotification = useNotification()
	const router = useRouter()
	const t = useTranslations()
	const currentLocale = useLocale()

	const {
		control,
		reset,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<ISkillsForm>({
		resolver: zodResolver(ChangeUserSkillSchema),
		defaultValues: {
			id: '',
			[Field.skill]: '',
			[Field.experience]: 0,
			[Field.description]: '',
		},
	})

	useEffect(() => {
		if (selectedSkill) {
			const formattedSkill = user?.skills?.find(
				skill => skill.id === selectedSkill
			)

			if (formattedSkill) {
				reset({
					id: formattedSkill.id,
					[Field.skill]: formattedSkill[Field.skill].id,
					[Field.experience]: formattedSkill[Field.experience],
					[Field.description]: formattedSkill[Field.description] ?? '',
				})
			}
		} else {
			reset({
				id: '',
				[Field.skill]: 0,
				[Field.experience]: 0,
				[Field.description]: '',
			})
		}
	}, [])

	const experience = watch(Field.experience)

	const updateMutation = useMutation({
		mutationFn: async (data: IUserSkillChanges) =>
			apiUpdateData(URL.ChangeUserSkill, data),
		onSuccess: result => {
			if (result) {
				router.refresh()
				handleClose()
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

	const createMutation = useMutation({
		mutationFn: async (data: IUserSkillChanges) =>
			apiCreateData(URL.ChangeUserSkill, data),
		onSuccess: result => {
			if (result) {
				router.refresh()
				handleClose()
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

	const onSubmit = async (data: ISkillsForm) => {
		const formattedSkillData = {
			id: selectedSkill ?? '',
			skillId: +data.skill,
			[Field.description]: data.description?.replace(/\n/g, '<br>') || '',
			[Field.experience]: data?.experience,
		}

		if (selectedSkill) {
			updateMutation.mutate(formattedSkillData)
		} else {
			createMutation.mutate(formattedSkillData)
		}
	}

	const yearsText = (years: number) => {
		if (years === 11) {
			return currentLocale === Language.EN ? 'more 10 years' : 'більше 10 років'
		} else {
			return getUkrainianYears(years)
		}
	}

	return (
		<Stack
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			display={'flex'}
			flexDirection={'column'}
			gap={2}
			width={'100%'}
		>
			<Typography id='modal-modal-title' variant='h1' component='h1'>
				Skills Info
			</Typography>

			<Stack direction={'row'} gap={1}>
				<Stack width={'100%'} gap={1}>
					<FormControl fullWidth required>
						<InputLabel id='age-label'>{t(`main.${Field.skill}`)}</InputLabel>
						<Controller
							control={control}
							name={Field.skill}
							render={({ field: { onChange, value } }) => (
								<Select
									labelId='skill-label'
									id='skill-select'
									value={value}
									label={t(`main.${Field.skill}`)}
									onChange={onChange}
								>
									{commonData.skills.map(skill => (
										<MenuItem key={skill.id} value={skill.id}>
											{skill.name}
										</MenuItem>
									))}
								</Select>
							)}
						/>
					</FormControl>

					<Stack gap={0.5} padding={'0 .5rem'}>
						<Typography>{t(`main.${Field.experience}`)}</Typography>
						<Controller
							control={control}
							name={Field.experience}
							render={({ field: { onChange, value } }) => (
								<Slider
									aria-label='Temperature'
									value={value || 0}
									onChange={onChange}
									step={1}
									marks
									min={0}
									max={11}
									sx={{
										height: 10,
										'.MuiSlider-track': {
											backgroundColor: '#ffb300',
										},
									}}
								/>
							)}
						/>
						<Typography>
							{experience > 0 && experience < 11 && `${experience} `}
							{yearsText(experience)}
						</Typography>
					</Stack>

					<TextField
						label={t(`main.${Field.description}`)}
						name={Field.description}
						onChange={e => setValue(Field.description, e.target.value)}
						value={watch(Field.description)?.replace(/<br\s*\/?>/g, '\n') || ''}
						multiline
						rows={4}
						fullWidth
					/>

					<Button
						type='submit'
						variant='contained'
						color='primary'
						// disabled={isPending}
					>
						{/* {isPending ? t('main.submitting') : t('main.send')} */}
						{t('main.send')}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}
