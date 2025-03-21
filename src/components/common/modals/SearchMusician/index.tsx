import useNotification from '@/hooks/useNotification'
import { useUserStore } from '@/store/userStore'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Box,
	Button,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Slider,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ISearchMusician, IUserSearchBand } from '../types'
import { Field, Language, MenuProps } from '@/lib/constants'
import { ICommonData } from '@/lib/globalTypes'
import { useMutation } from '@tanstack/react-query'
import { apiCreateData, apiUpdateData } from '@/lib/fetch'
import { URL } from '@/lib/apiURLs'
import { useEffect } from 'react'
import { getUkrainianYears } from '@/lib/helpers'
// import { ChangeUserSearchBand } from './schema'

interface Props {
	commonData: ICommonData
	isEdit?: boolean
	selectedId?: number
	handleClose: () => void
}

export default function InSearchMusician({
	commonData,
	selectedId,
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
	} = useForm<ISearchMusician>({
		// resolver: zodResolver(ChangeUserSearchBand),
		defaultValues: {
			id: '',
			[Field.skill]: '',
			[Field.styles]: [],
			[Field.experience]: 0,
			[Field.description]: '',
		},
	})

	const experience = watch(Field.experience)

	useEffect(() => {
		if (selectedId) {
			const announcement = user?.inSearchMusician?.find(
				item => item.id === selectedId
			)

			if (announcement) {
				reset({
					id: announcement.id,
					[Field.skill]: announcement.skill?.id,
					[Field.experience]: announcement.experience,
					[Field.styles]: announcement?.styles?.map(style => style.id),
					[Field.description]: announcement.description,
				})
			}
		}
	}, [])

	const createMutation = useMutation({
		mutationFn: async (data: ISearchMusician) =>
			apiCreateData(URL.ChangeUserSearchMusician, data),
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

	const updateMutation = useMutation({
		mutationFn: async (data: ISearchMusician) =>
			apiUpdateData(URL.ChangeUserSearchMusician, data),
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

	const onSubmit: SubmitHandler<ISearchMusician> = async data => {
		const formattedData = {
			...data,
			[Field.description]: data.description?.replace(/\n/g, '<br>') || '',
		}

		if (selectedId) {
			updateMutation.mutate(formattedData)
		} else {
			createMutation.mutate(formattedData)
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
				Search Musician
			</Typography>

			<FormControl fullWidth required>
				<InputLabel id='age-label'>{t(`main.${Field.skill}`)}</InputLabel>
				<Controller
					control={control}
					name={Field.skill}
					render={({ field: { onChange, value } }) => (
						<Select
							value={value}
							label={t(`main.${Field.skill}`)}
							onChange={onChange}
						>
							{commonData?.skills?.map(skill => (
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

			<FormControl fullWidth>
				<InputLabel id='styles-label'>{t(`main.${Field.styles}`)}</InputLabel>
				<Controller
					control={control}
					name={Field.styles}
					render={({ field: { onChange, value } }) => (
						<Select
							labelId='styles-label'
							id='styles-chip'
							multiple
							value={value}
							onChange={onChange}
							input={<OutlinedInput id='styles-chip' label='Styles' />}
							renderValue={selected => {
								const selectedStyles = selected.map(id =>
									commonData.styles.find(style => style.id === id)
								)

								return (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selectedStyles.map(
											style =>
												style && <Chip key={style.id} label={style.name} />
										)}
									</Box>
								)
							}}
							MenuProps={MenuProps}
						>
							{commonData.styles.map(style => (
								<MenuItem key={style.id} value={style.id}>
									{style.name}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>

			<TextField
				label={t(`main.${Field.description}`)}
				name={Field.description}
				error={!!errors?.[Field.description]}
				helperText={
					errors.description ? errors?.[Field.description]?.message : ''
				}
				multiline
				rows={6}
				fullWidth
				onChange={e => setValue(Field.description, e.target.value)}
				value={watch(Field.description)?.replace(/<br\s*\/?>/g, '\n') || ''}
				required
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
	)
}
