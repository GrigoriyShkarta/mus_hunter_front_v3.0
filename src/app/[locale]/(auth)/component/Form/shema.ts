import { Field } from '@/lib/constants'
import { z } from 'zod'

export const SignInSchema = z.object({
	[Field.email]: z.string().email('validation.email'),
	[Field.password]: z
		.string()
		.min(6, 'validation.passwordLength')
		.regex(/^[^\s]+$/, 'validation.noSpaceField')
		.regex(/[a-zA-Z]/, 'validation.latinSymbolsContainPassword')
		.regex(/\d/, 'validation.numberContainPassword'),
})

export const RegistrationSchema = z
	.object({
		[Field.firstName]: z
			.string()
			.regex(/[a-zA-Zа-яА-Я]/, 'validation.symbolContain')
			.regex(/^[^\s]+$/, 'validation.noSpaceField'),
		[Field.lastName]: z
			.string()
			.regex(/[a-zA-Zа-яА-Я]/, 'validation.symbolContain')
			.regex(/^[^\s]+$/, 'validation.noSpaceField'),
		[Field.email]: z.string().email('validation.email'),
		[Field.password]: z
			.string()
			.min(6, 'validation.passwordLength')
			.regex(/^[^\s]+$/, 'validation.noSpaceField')
			.regex(/[a-zA-Z]/, 'validation.latinSymbolsContainPassword')
			.regex(/\d/, 'validation.numberContainPassword'),
		[Field.repeatPassword]: z
			.string()
			.min(6, 'validation.passwordLength')
			.regex(/^[^\s]+$/, 'validation.noSpaceField')
			.regex(/[a-zA-Z]/, 'validation.latinSymbolsContainPassword')
			.regex(/\d/, 'validation.numberContainPassword'),
	})
	.refine(data => data[Field.password] === data[Field.repeatPassword], {
		message: 'validation.passwordsNotMatch',
		path: [Field.repeatPassword],
	})

export const ForgotPasswordSchema = z.object({
	[Field.email]: z.string().email('validation.email'),
})
