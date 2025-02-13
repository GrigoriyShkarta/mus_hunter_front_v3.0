'use client'

import {
	Dispatch,
	SetStateAction,
	useActionState,
	useEffect,
	useState,
} from 'react'

import useNotification from '@/hooks/useNotification'
import { Field } from '@/lib/constants'
import {
	Button,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { registration } from '../actions'
import { Form, RegistrationForm } from '../types'

interface Props {
	setFrom: Dispatch<SetStateAction<Form>>
}

export default function Registration({ setFrom }: Props) {
	const [showPassword, setShowPassword] = useState(false)
	const [showRepeatPassword, setShowRepeatPassword] = useState(false)
	const [formState, action, isPending] = useActionState<
		RegistrationForm,
		FormData
	>(registration, {
		[Field.firstName]: '',
		[Field.lastName]: '',
		[Field.email]: '',
		[Field.password]: '',
		[Field.repeatPassword]: '',
	})
	const t = useTranslations()
	const showNotification = useNotification()

	useEffect(() => {
		if (formState.success) {
			console.log('Success')
		}
		if (formState.errors?.responseError) {
			showNotification(t(`${formState.errors.responseError}`), 'error')
		}
	}, [formState])

	return (
		<Stack
			component='form'
			action={action}
			display={'flex'}
			flexDirection={'column'}
			gap={2}
			boxShadow={3}
			borderRadius={2}
			width={'100%'}
			padding={2}
		>
			<Typography variant='h1'>{t('main.registration')}</Typography>

			<Stack direction={'row'} gap={1}>
				<TextField
					label={t(`main.${Field.firstName}`)}
					name={Field.firstName}
					defaultValue={formState[Field.firstName]}
					error={!!formState.errors?.[Field.firstName]}
					helperText={
						formState.errors?.[Field.firstName]
							? t(`${formState.errors[Field.firstName][0]}`)
							: ''
					}
					fullWidth
					required
				/>
				<TextField
					label={t(`main.${Field.lastName}`)}
					name={Field.lastName}
					defaultValue={formState[Field.lastName]}
					error={!!formState.errors?.[Field.lastName]}
					helperText={
						formState.errors?.[Field.lastName]
							? t(`${formState.errors[Field.lastName][0]}`)
							: ''
					}
					fullWidth
					required
				/>
			</Stack>

			<TextField
				label={t(`main.${Field.email}`)}
				name={Field.email}
				type={'email'}
				defaultValue={formState[Field.email]}
				error={!!formState.errors?.[Field.email]}
				helperText={
					formState.errors?.[Field.email]
						? t(`${formState.errors[Field.email][0]}`)
						: ''
				}
				fullWidth
				required
			/>

			<TextField
				label={t(`main.${Field.password}`)}
				name={Field.password}
				type={showPassword ? 'text' : 'password'}
				defaultValue={formState[Field.password]}
				error={!!formState.errors?.[Field.password]}
				helperText={
					formState.errors?.[Field.password]
						? t(`${formState.errors[Field.password][0]}`)
						: ''
				}
				fullWidth
				required
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
								edge='end'
							>
								{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<TextField
				label={t(`main.${Field.repeatPassword}`)}
				name={Field.repeatPassword}
				type={showRepeatPassword ? 'text' : 'password'}
				defaultValue={formState[Field.repeatPassword]}
				error={!!formState.errors?.[Field.repeatPassword]}
				helperText={
					formState.errors?.[Field.repeatPassword]
						? t(`${formState.errors[Field.repeatPassword][0]}`)
						: ''
				}
				fullWidth
				required
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								onClick={() => setShowRepeatPassword(!showPassword)}
								edge='end'
							>
								{showRepeatPassword ? <FaRegEyeSlash /> : <FaRegEye />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<Stack direction={'row'} gap={1} justifyContent={'center'}>
				<Typography>{t('main.haveAccount')}</Typography>
				<Typography
					color={'secondary'}
					onClick={() => setFrom(Form.SignIn)}
					sx={{
						cursor: 'pointer',
						'&:hover': {
							textDecoration: 'underline',
						},
					}}
				>
					{t('main.sign_in')}
				</Typography>
			</Stack>

			<Button
				type='submit'
				variant='contained'
				color='primary'
				disabled={isPending}
			>
				{isPending ? t('main.submitting') : t('main.send')}
			</Button>
		</Stack>
	)
}
