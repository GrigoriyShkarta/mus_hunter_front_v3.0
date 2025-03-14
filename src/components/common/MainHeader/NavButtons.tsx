import { Stack, Button } from "@mui/material";
import { useTranslations } from "next-intl";

export default function NavButtons() {
	const t = useTranslations("main");

	return (
		<Stack flexGrow={1} direction={"row"}>
			<Button variant="text" color="secondary" sx={{ color: "white" }}>
				{t("people")}
			</Button>
			<Button variant="text" color="secondary" sx={{ color: "white" }}>
				{t("bands")}
			</Button>
		</Stack>
	);
}
