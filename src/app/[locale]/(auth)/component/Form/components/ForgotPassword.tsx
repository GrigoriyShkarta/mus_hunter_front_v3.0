"use client";

import { Dispatch, SetStateAction, useActionState } from "react";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { forgotPassword } from "../actions";
import { Form, ForgotPasswordForm } from "../types";
import { Field } from "@/lib/constants";

interface Props {
	setFrom: Dispatch<SetStateAction<Form>>;
}

export default function ForgotPassword({ setFrom }: Props) {
	const [formState, action, isPending] = useActionState<
		ForgotPasswordForm,
		FormData
	>(forgotPassword, {
		[Field.email]: "",
	});
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
			<Typography variant="h1">{t("main.passwordRecovery")}</Typography>

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

			<Typography>{t("main.forgotPasswordText")}</Typography>

			<Typography
				color={"secondary"}
				onClick={() => setFrom(Form.SignIn)}
				sx={{
					cursor: "pointer",
					"&:hover": {
						textDecoration: "underline",
					},
				}}
			>
				{t("main.back")}
			</Typography>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={isPending}
			>
				{isPending ? t("main.submitting") : t("main.send")}
			</Button>
		</Stack>
	);
}
