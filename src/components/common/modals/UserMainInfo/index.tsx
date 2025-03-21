'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
	Box,
	Button,
	Chip,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { IMainInfoForm } from '../types'
import { Field, MenuProps } from '@/lib/constants'
import { useTranslations } from 'next-intl'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'
import { ICommonData } from '@/lib/globalTypes'
import { IoIosClose } from 'react-icons/io'
import { useMutation } from '@tanstack/react-query'
import { apiUpdateData } from '@/lib/fetch'
import useNotification from '@/hooks/useNotification'
import { useRouter } from 'next/navigation'
import { URL } from '@/lib/apiURLs'
import { ChangeMainUserInfo } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
	commonData: ICommonData
	handleClose: () => void
}

export default function UserMainInfo({ commonData, handleClose }: Props) {
	const user = useUserStore(state => state.user)
	const showNotification = useNotification()
	const router = useRouter()
	const t = useTranslations()
	const {
		control,
		reset,
		watch,
		setValue,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMainInfoForm>({
		resolver: zodResolver(ChangeMainUserInfo),
		defaultValues: {
			[Field.firstName]: '',
			[Field.lastName]: '',
			[Field.age]: '',
			[Field.links]: [],
			[Field.city]: '',
			[Field.description]: '',
			[Field.styles]: [],
			[Field.telephone]: '',
		},
	})

	useEffect(() => {
		reset({
			[Field.firstName]: user?.[Field.firstName],
			[Field.lastName]: user?.[Field.lastName],
			[Field.age]: user?.[Field.age],
			[Field.city]: user?.[Field.city]?.id,
			[Field.description]: user?.[Field.description],
			[Field.links]: user?.[Field.links],
			[Field.styles]: user?.[Field.styles]?.map(style => style.id),
			[Field.telephone]: user?.[Field.telephone],
		})
	}, [])

	const links = watch(Field.links) || []

	const addLink = () => {
		setValue(Field.links, [...links, ''])
	}

	const removeLink = (index: number) => {
		const updatedLinks = links.filter((_, i) => i !== index)
		setValue(Field.links, updatedLinks)
	}

	const updateLink = (index: number, value: string) => {
		const updatedLinks = [...links]
		updatedLinks[index] = value
		setValue(Field.links, updatedLinks)
	}

	const updateMutation = useMutation({
		mutationFn: async (data: IMainInfoForm) =>
			apiUpdateData(URL.ChangeUserMainInfo, data),
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

	const onSubmit: SubmitHandler<IMainInfoForm> = async data => {
		// console.log(data.age)
		const formattedData = {
			...data,
			[Field.age]: dayjs(data.age).format('YYYY-MM-DD'),
			[Field.description]: data.description?.replace(/\n/g, '<br>') || '',
		}
		console.log('formattedData', formattedData)
		updateMutation.mutate(formattedData)
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
				Main Info
			</Typography>
			<Stack direction={'row'} gap={1}>
				<TextField
					{...register(Field.firstName)}
					label={t(`main.${Field.firstName}`)}
					name={Field.firstName}
					error={!!errors?.[Field.firstName]}
					helperText={
						errors.firstName ? errors?.[Field.firstName]?.message : ''
					}
					fullWidth
					required
				/>
				<TextField
					label={t(`main.${Field.lastName}`)}
					{...register(Field.lastName)}
					error={!!errors?.[Field.lastName]}
					helperText={errors.firstName ? errors?.[Field.lastName]?.message : ''}
					fullWidth
					required
				/>
			</Stack>
			<Controller
				control={control}
				name={Field.age}
				render={({ field: { onChange, value } }) => (
					<DatePicker
						label={t(`main.${Field.age}`)}
						value={value ? dayjs(value) : null}
						format={'DD-MM-YYYY'}
						onChange={onChange}
					/>
				)}
			/>
			<FormControl fullWidth>
				<InputLabel id='age-label'>{t(`main.${Field.city}`)}</InputLabel>
				<Controller
					control={control}
					name={Field.city}
					render={({ field: { onChange, value } }) => (
						<Select
							labelId='city-label'
							id='city-select'
							value={value}
							label={t(`main.${Field.city}`)}
							onChange={onChange}
						>
							{commonData.cities.map(city => (
								<MenuItem key={city.id} value={city.id}>
									{city.name}
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
				{...register(Field.telephone)}
				label={t(`main.${Field.telephone}`)}
				name={Field.telephone}
				fullWidth
			/>
			<TextField
				label={t(`main.${Field.description}`)}
				name={Field.description}
				error={!!errors?.[Field.description]}
				onChange={e => setValue(Field.description, e.target.value)}
				value={watch(Field.description)?.replace(/<br\s*\/?>/g, '\n') || ''}
				multiline
				rows={6}
				fullWidth
			/>
			{links.length > 0 &&
				links.map((link, index) => (
					<Stack key={index} direction={'row'} gap={'10px'}>
						<TextField
							value={link}
							onChange={e => updateLink(index, e.target.value)}
							label={t(`main.${Field.links}`)}
							error={!!errors?.[Field.links]?.[index]}
							helperText={errors?.[Field.links]?.[index]?.message || ''}
							fullWidth
						/>
						<IconButton
							onClick={() => removeLink(index)}
							edge='end'
							sx={{ width: '60px', height: '60px' }}
						>
							<IoIosClose size={32} />
						</IconButton>
					</Stack>
				))}

			<Button variant='contained' onClick={addLink}>
				➕ Add new link
			</Button>

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
