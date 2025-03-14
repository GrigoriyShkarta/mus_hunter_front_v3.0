'use client'

import { ModalType } from '@/lib/constants'
import { Box, Modal } from '@mui/material'
import UserMainInfo from '../UserMainInfo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'

interface MainInfoProps {
	open: boolean
	type: ModalType
	handleClose: () => void
}

export default function MainModal({ open, type, handleClose }: MainInfoProps) {
	const renderModalContent = () => {
		switch (type) {
			case ModalType.UserMain:
				return <UserMainInfo />
			default:
				return null
		}
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 650,
					bgcolor: 'background.paper',
					border: '1px solid #000',
					borderRadius: '1rem',
					boxShadow: 24,
					p: 4,
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					{renderModalContent()}
				</LocalizationProvider>
			</Box>
		</Modal>
	)
}
