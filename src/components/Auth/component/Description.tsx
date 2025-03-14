import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { GiBinoculars } from "react-icons/gi";

export default function Description() {
	const t = useTranslations("main");

	return (
		<Stack
			display={"flex"}
			alignItems={"center"}
			textAlign={"center"}
			justifyContent={"center"}
			flex={1}
		>
			<Typography variant="h1">MUS HUNTER</Typography>
			<GiBinoculars color="#ffb300" size={170} />
			<Typography variant="h4">{t("welcome")}</Typography>
		</Stack>
	);
}
