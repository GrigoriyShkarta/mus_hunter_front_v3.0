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
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IUserSearchBand } from '../types'
import { Field, MenuProps } from '@/lib/constants'
import { ICommonData } from '@/lib/globalTypes'
import { useMutation } from '@tanstack/react-query'
import { apiCreateData, apiUpdateData } from '@/lib/fetch'
import { URL } from '@/lib/apiURLs'
import { useEffect } from 'react'
import { ChangeUserSearchBand } from './schema'

interface Props {
	commonData: ICommonData
	isEdit?: boolean
	selectedId?: number
	handleClose: () => void
}

export default function UserInSearchBand({
	commonData,
	selectedId,
	handleClose,
}: Props) {
	const user = useUserStore(state => state.user)
	const showNotification = useNotification()
	const router = useRouter()
	const t = useTranslations()
	const {
		control,
		reset,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserSearchBand>({
		resolver: zodResolver(ChangeUserSearchBand),
		defaultValues: {
			id: '',
			[Field.skill]: '',
			[Field.styles]: [],
			[Field.description]: '',
		},
	})

	useEffect(() => {
		if (selectedId) {
			reset({
				id: user?.inSearchBand?.id,
				[Field.skill]: user?.inSearchBand?.skill?.id,
				[Field.styles]: user?.inSearchBand?.styles.map(style => style.id),
				[Field.description]: user?.inSearchBand?.description,
			})
		}
	}, [])

	const createMutation = useMutation({
		mutationFn: async (data: IUserSearchBand) =>
			apiCreateData(URL.ChangeUserSearchBand, data),
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
		mutationFn: async (data: IUserSearchBand) =>
			apiUpdateData(URL.ChangeUserSearchBand, data),
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

	const onSubmit: SubmitHandler<IUserSearchBand> = async data => {
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
				Search Band
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
							{user?.skills?.map(skill => (
								<MenuItem key={skill.id} value={skill.id}>
									{skill.skill.name}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>

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
