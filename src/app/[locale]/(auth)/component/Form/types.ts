import { Field } from "@/lib/constants";

export enum Form {
	SignIn,
	Registration,
	ForgotPassword,
}

export interface SignInForm {
	[Field.email]: string;
	[Field.password]: string;
	errors?: {
		[Field.email]?: string[];
		[Field.password]?: string[];
	} | null;
}

export interface RegistrationForm {
	[Field.firstName]: string;
	[Field.lastName]: string;
	[Field.email]: string;
	[Field.password]: string;
	[Field.repeatPassword]: string;
	errors?: {
		[Field.email]?: string[];
		[Field.password]?: string[];
		[Field.firstName]?: string[];
		[Field.lastName]?: string[];
		[Field.repeatPassword]?: string[];
	} | null;
}

export interface ForgotPasswordForm {
	[Field.email]: string;
	errors?: {
		[Field.email]?: string[];
	} | null;
}
