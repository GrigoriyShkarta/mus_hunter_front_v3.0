"use client";

import { useState } from "react";

import { Stack } from "@mui/material";
import { Form } from "./types";
import SignIn from "./components/SignIn";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";

export default function From() {
	const [form, setFrom] = useState<Form>(Form.SignIn);

	const renderForm = () => {
		switch (form) {
			case Form.SignIn:
				return <SignIn setFrom={setFrom} />;
			case Form.Registration:
				return <Registration setFrom={setFrom} />;
			case Form.ForgotPassword:
				return <ForgotPassword setFrom={setFrom} />;
			default:
				return <SignIn setFrom={setFrom} />;
		}
	};

	return (
		<Stack
			alignItems={"center"}
			textAlign={"center"}
			justifyContent={"center"}
			flex={1}
		>
			{renderForm()}
		</Stack>
	);
}
