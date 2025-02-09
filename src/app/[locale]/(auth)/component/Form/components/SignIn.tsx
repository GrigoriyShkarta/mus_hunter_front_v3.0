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
import { FaGoogle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { signIn, signInWithGoogle } from '../actions'
import { Form, SignInForm } from '../types'

interface Props {
	setFrom: Dispatch<SetStateAction<Form>>
}

export default function SignIn({ setFrom }: Props) {
	const [showPassword, setShowPassword] = useState(false)
	const [formState, action, isPending] = useActionState<SignInForm, FormData>(
		signIn,
		{
			[Field.email]: '',
			[Field.password]: '',
		}
	)
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
			<Typography variant='h1'>{t('main.sign_in')}</Typography>

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

			<Stack>
				<Typography
					color={'secondary'}
					onClick={() => setFrom(Form.ForgotPassword)}
					sx={{
						cursor: 'pointer',
						'&:hover': {
							textDecoration: 'underline',
						},
					}}
				>
					{t('main.forgotPassword')}
				</Typography>

				<Stack direction={'row'} gap={1} justifyContent={'center'}>
					<Typography>{t('main.noRegistrationText')}</Typography>
					<Typography
						color={'secondary'}
						onClick={() => setFrom(Form.Registration)}
						sx={{
							cursor: 'pointer',
							'&:hover': {
								textDecoration: 'underline',
							},
						}}
					>
						{t('main.join')}
					</Typography>
				</Stack>
			</Stack>

			<Button
				type='submit'
				variant='contained'
				color='primary'
				disabled={isPending}
			>
				{isPending ? t('main.submitting') : t('main.sign_in')}
			</Button>

			<Button
				variant='contained'
				onClick={signInWithGoogle}
				startIcon={<FaGoogle />}
				color='error'
			>
				{t('main.loginWithGoogle')}
			</Button>
		</Stack>
	)
}
