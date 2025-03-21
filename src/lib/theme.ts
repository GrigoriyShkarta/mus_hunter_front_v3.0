'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#212121',
		},
		secondary: {
			main: '#ffb300',
		},
	},
	typography: {
		fontFamily: "'Poppins', 'Arial', sans-serif",
		h1: {
			fontSize: '2rem',
			fontWeight: 700,
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 500,
		},
	},
	components: {
		MuiChip: {
			styleOverrides: {
				root: {
					height: 'auto',
					padding: '2px 8px',
					fontSize: '0.8rem',
				},
				label: {
					padding: '0px',
				},
			},
		},
	},
})

export default theme
