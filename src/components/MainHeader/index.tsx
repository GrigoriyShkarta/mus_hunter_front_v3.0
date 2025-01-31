import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { GiBinoculars } from "react-icons/gi";
import NavButtons from "./NavButtons";
import Profile from "./Profile";

export default function MainHeader() {
	return (
		<AppBar position="static">
			<Container
				maxWidth="lg"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Stack direction={"row"} gap={4}>
					<Toolbar disableGutters>
						<GiBinoculars color="primary.main" size={34} />
						<Typography
							variant="h4"
							ml={1}
							color={"secondary"}
							sx={{
								display: { xs: "none", sm: "block" },
							}}
						>
							Mus Hunter
						</Typography>
					</Toolbar>

					<NavButtons />
				</Stack>

				<Profile />
			</Container>
		</AppBar>
	);
}
