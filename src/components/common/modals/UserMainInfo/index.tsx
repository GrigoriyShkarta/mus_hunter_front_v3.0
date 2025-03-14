'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import { IMainInfoForm } from '../types'
import { Field } from '@/lib/constants'
import { useTranslations } from 'next-intl'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'

export default function UserMainInfo() {
	const user = useUserStore(state => state.user)
	const {
		control,
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IMainInfoForm>({
		defaultValues: {
			[Field.firstName]: '',
			[Field.lastName]: '',
			[Field.age]: '',
			[Field.links]: [],
			[Field.cityId]: '',
			[Field.description]: '',
			[Field.styles]: [],
			[Field.telephone]: '',
		},
	})

	useEffect(() => {
		reset({
			[Field.firstName]: user?.[Field.firstName],
			[Field.lastName]: user?.[Field.lastName],
		})
	}, [])

	const t = useTranslations()

	const onSubmit: SubmitHandler<IMainInfoForm> = async data => {
		console.log(data)
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
						label={'Birthday'}
						value={value ? dayjs(value) : null}
						format={'DD-MM-YYYY'}
						onChange={onChange}
					/>
				)}
			/>
			<Controller
				control={control}
				name={Field.cityId}
				render={({ field: { onChange, value } }) => (
					<DatePicker
						label={'Birthday'}
						value={value ? dayjs(value) : null}
						format={'DD-MM-YYYY'}
						onChange={onChange}
					/>
				)}
			/>
		</Stack>
	)
}
