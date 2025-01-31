"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#212121",
		},
		secondary: {
			main: "#ffb300",
		},
	},
	typography: {
		fontFamily: "'Poppins', 'Arial', sans-serif",
		h1: {
			fontSize: "2.5rem",
			fontWeight: 700,
		},
		h5: {
			fontSize: "1.5rem",
			fontWeight: 500,
		},
	},
});

export default theme;
