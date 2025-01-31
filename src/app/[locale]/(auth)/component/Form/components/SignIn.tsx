"use client";

import { Dispatch, SetStateAction, useActionState } from "react";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { signIn } from "../actions";
import { Form, SignInForm } from "../types";
import { Field } from "@/lib/constants";

interface Props {
	setFrom: Dispatch<SetStateAction<Form>>;
}

export default function SignIn({ setFrom }: Props) {
	const [formState, action, isPending] = useActionState<SignInForm, FormData>(
		signIn,
		{
			[Field.email]: "",
			[Field.password]: "",
		}
	);
	const t = useTranslations();

	return (
		<Stack
			component="form"
			action={action}
			display={"flex"}
			flexDirection={"column"}
			gap={2}
			boxShadow={3}
			borderRadius={2}
			width={"100%"}
			padding={2}
		>
			<Typography variant="h1">{t("main.sign_in")}</Typography>

			<TextField
				label={t(`main.${Field.email}`)}
				name={Field.email}
				type={"email"}
				defaultValue={formState[Field.email]}
				error={!!formState.errors?.[Field.email]}
				helperText={
					formState.errors?.[Field.email]
						? t(`${formState.errors[Field.email][0]}`)
						: ""
				}
				fullWidth
				required
			/>

			<TextField
				label={t(`main.${Field.password}`)}
				name={Field.password}
				type={"password"}
				defaultValue={formState[Field.password]}
				error={!!formState.errors?.[Field.password]}
				helperText={
					formState.errors?.[Field.password]
						? t(`${formState.errors[Field.password][0]}`)
						: ""
				}
				fullWidth
				required
			/>

			<Stack>
				<Typography
					color={"secondary"}
					onClick={() => setFrom(Form.ForgotPassword)}
					sx={{
						cursor: "pointer",
						"&:hover": {
							textDecoration: "underline",
						},
					}}
				>
					{t("main.forgotPassword")}
				</Typography>

				<Stack direction={"row"} gap={1} justifyContent={"center"}>
					<Typography>{t("main.noRegistrationText")}</Typography>
					<Typography
						color={"secondary"}
						onClick={() => setFrom(Form.Registration)}
						sx={{
							cursor: "pointer",
							"&:hover": {
								textDecoration: "underline",
							},
						}}
					>
						{t("main.join")}
					</Typography>
				</Stack>
			</Stack>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={isPending}
			>
				{isPending ? t("main.submitting") : t("main.sign_in")}
			</Button>
		</Stack>
	);
}
