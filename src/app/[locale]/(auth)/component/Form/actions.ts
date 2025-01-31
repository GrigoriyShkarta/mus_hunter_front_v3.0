import { Field } from "@/lib/constants";
import {
	ForgotPasswordSchema,
	RegistrationSchema,
	SignInSchema,
} from "./shema";
import { RegistrationForm, SignInForm, ForgotPasswordForm } from "./types";

export function signIn(prevState: SignInForm, formData: FormData): SignInForm {
	const rawData = {
		[Field.email]: formData.get(Field.email),
		[Field.password]: formData.get(Field.password),
	};

	const result = SignInSchema.safeParse(rawData);

	if (!result.success) {
		return {
			...(rawData as SignInForm),
			errors: result.error.flatten().fieldErrors,
		};
	}

	return {
		...result.data,
		errors: null,
	};
}

export function registration(
	prevState: RegistrationForm,
	formData: FormData
): RegistrationForm {
	const rawData = {
		[Field.firstName]: formData.get(Field.firstName),
		[Field.lastName]: formData.get(Field.lastName),
		[Field.email]: formData.get(Field.email),
		[Field.password]: formData.get(Field.password),
		[Field.repeatPassword]: formData.get(Field.repeatPassword),
	};

	const result = RegistrationSchema.safeParse(rawData);

	if (!result.success) {
		return {
			...(rawData as RegistrationForm),
			errors: result.error.flatten().fieldErrors,
		};
	}

	return {
		...result.data,
		errors: null,
	};
}

export function forgotPassword(
	prevState: ForgotPasswordForm,
	formData: FormData
): ForgotPasswordForm {
	const rawData = {
		[Field.email]: formData.get(Field.email),
	};

	const result = ForgotPasswordSchema.safeParse(rawData);

	if (!result.success) {
		return {
			...(rawData as ForgotPasswordForm),
			errors: result.error.flatten().fieldErrors,
		};
	}

	return {
		...result.data,
		errors: null,
	};
}
