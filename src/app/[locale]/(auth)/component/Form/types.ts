import { Field } from '@/lib/constants'

export enum Form {
	SignIn,
	Registration,
	ForgotPassword,
}

export interface SignInForm {
	[Field.email]: string
	[Field.password]: string
	success?: boolean
	errors?: {
		[Field.email]?: string[]
		[Field.password]?: string[]
		success?: boolean
		responseError?: string
	} | null
}

export interface RegistrationForm {
	[Field.firstName]: string
	[Field.lastName]: string
	[Field.email]: string
	[Field.password]: string
	[Field.repeatPassword]: string
	success?: boolean
	errors?: {
		[Field.email]?: string[]
		[Field.password]?: string[]
		[Field.firstName]?: string[]
		[Field.lastName]?: string[]
		[Field.repeatPassword]?: string[]
		responseError?: string
	} | null
}

export interface ForgotPasswordForm {
	[Field.email]: string
	success?: boolean
	errors?: {
		[Field.email]?: string[]
		success?: boolean
		responseError?: string
	} | null
}

export type FirebaseErrorCode =
	| 'auth/invalid-credential'
	| 'auth/email-already-in-use'
