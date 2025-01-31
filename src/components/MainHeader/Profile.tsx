import { Button, Toolbar } from "@mui/material";
import { useTranslations } from "next-intl";
import { PiSignIn } from "react-icons/pi";

// import { PiUserCircleThin } from "react-icons/pi";

export default function Profile() {
	const t = useTranslations("main");

	return (
		<Toolbar>
			{/* <PiUserCircleThin size={34} /> */}
			<Button
				variant="text"
				color="secondary"
				endIcon={<PiSignIn />}
				sx={{ color: "white" }}
			>
				{t("sign_in")}
			</Button>
		</Toolbar>
	);
}
