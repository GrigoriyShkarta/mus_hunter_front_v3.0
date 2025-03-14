'use client'
import { IconButton } from '@mui/material'
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack'
import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
	const { closeSnackbar } = useSnackbar()

	return (
		<IconButton
			size='small'
			onClick={() => closeSnackbar(snackbarKey)}
			sx={{ color: '#fff' }}
		>
			<MdClose fontSize='small' />
		</IconButton>
	)
}

export default function Notifications({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<SnackbarProvider
			maxSnack={10}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
		>
			{children}
		</SnackbarProvider>
	)
}
