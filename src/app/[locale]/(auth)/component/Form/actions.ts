import { Field } from '@/lib/constants'
import { auth, googleProvider } from '@/lib/firebase'
import { FirebaseError } from '@firebase/util'
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth'
import { ForgotPasswordSchema, RegistrationSchema, SignInSchema } from './shema'
import {
	FirebaseErrorCode,
	ForgotPasswordForm,
	RegistrationForm,
	SignInForm,
} from './types'

const handleFirebaseError = (error: FirebaseError) => {
	const errorCode = error.code as FirebaseErrorCode
	switch (errorCode) {
		case 'auth/invalid-credential':
			return {
				[Field.email]: ['validation.wrongSignIn'],
				[Field.password]: ['validation.wrongSignIn'],
			}
		case 'auth/email-already-in-use':
			return {
				[Field.email]: ['validation.emailAlreadyInUse'],
			}
		default:
			return {
				responseError: 'validation.smtWrong',
			}
	}
}

export async function signIn(
	prevState: SignInForm,
	formData: FormData
): Promise<SignInForm> {
	const rawData = {
		[Field.email]: formData.get(Field.email) as string,
		[Field.password]: formData.get(Field.password) as string,
	}

	const result = SignInSchema.safeParse(rawData)

	if (!result.success) {
		return {
			...rawData,
			errors: result.error.flatten().fieldErrors,
		}
	}

	try {
		await signInWithEmailAndPassword(
			auth,
			rawData[Field.email],
			rawData[Field.password]
		)
		return {
			...rawData,
			success: true,
			errors: null,
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			return {
				...rawData,
				success: false,
				errors: handleFirebaseError(error),
			}
		}
		return {
			...rawData,
			success: false,
			errors: {
				responseError: 'validation.smtWrong',
			},
		}
	}
}

export async function registration(
	prevState: RegistrationForm,
	formData: FormData
): Promise<RegistrationForm> {
	const rawData = {
		[Field.firstName]: formData.get(Field.firstName) as string,
		[Field.lastName]: formData.get(Field.lastName) as string,
		[Field.email]: formData.get(Field.email) as string,
		[Field.password]: formData.get(Field.password) as string,
		[Field.repeatPassword]: formData.get(Field.repeatPassword) as string,
	}

	const result = RegistrationSchema.safeParse(rawData)

	if (!result.success) {
		return {
			...rawData,
			errors: result.error.flatten().fieldErrors,
		}
	}

	try {
		await createUserWithEmailAndPassword(
			auth,
			rawData[Field.email],
			rawData[Field.password]
		)
		return {
			...rawData,
			success: true,
			errors: null,
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			return {
				...rawData,
				success: false,
				errors: handleFirebaseError(error),
			}
		}
		return {
			...rawData,
			success: false,
			errors: {
				responseError: 'validation.smtWrong',
			},
		}
	}
}

export async function forgotPassword(
	prevState: ForgotPasswordForm,
	formData: FormData
): Promise<ForgotPasswordForm> {
	const rawData = {
		[Field.email]: formData.get(Field.email) as string,
	}

	const result = ForgotPasswordSchema.safeParse(rawData)

	if (!result.success) {
		return {
			...rawData,
			errors: result.error.flatten().fieldErrors,
		}
	}

	try {
		await sendPasswordResetEmail(auth, rawData[Field.email])
		return {
			...rawData,
			success: true,
			errors: null,
		}
	} catch (error) {
		if (error instanceof FirebaseError) {
			return {
				...rawData,
				success: false,
				errors: handleFirebaseError(error),
			}
		}
		return {
			...rawData,
			success: false,
			errors: {
				responseError: 'validation.smtWrong',
			},
		}
	}
}

export async function signInWithGoogle() {
	try {
		const result = await signInWithPopup(auth, googleProvider)
		console.log(result.user)
	} catch (error) {
		console.error('Ошибка аутентификации:', error)
	}
}
