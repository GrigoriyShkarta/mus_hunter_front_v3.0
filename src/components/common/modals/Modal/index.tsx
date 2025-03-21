'use client'

import { ModalType } from '@/lib/constants'
import { Box, Modal } from '@mui/material'
import UserMainInfo from '../UserMainInfo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { ICommonData } from '@/lib/globalTypes'
import UserSkills from '../UserSkills'
import UserInSearchBand from '../UserInSearchBand'
import InSearchMusician from '../SearchMusician'

interface MainInfoProps {
	open: boolean
	type: ModalType
	commonData: ICommonData
	selectedId?: number
	handleClose: () => void
}

export default function MainModal({
	open,
	type,
	commonData,
	selectedId,
	handleClose,
}: MainInfoProps) {
	const renderModalContent = () => {
		switch (type) {
			case ModalType.UserMain:
				return (
					<UserMainInfo commonData={commonData} handleClose={handleClose} />
				)
			case ModalType.UserSkills:
				return (
					<UserSkills
						commonData={commonData}
						handleClose={handleClose}
						selectedSkill={selectedId}
					/>
				)
			case ModalType.UserInSearchBand:
				return (
					<UserInSearchBand
						commonData={commonData}
						handleClose={handleClose}
						selectedId={selectedId}
					/>
				)
			case ModalType.InSearchMusician:
				return (
					<InSearchMusician
						commonData={commonData}
						handleClose={handleClose}
						selectedId={selectedId}
					/>
				)
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
			sx={{
				height: '100vh',
			}}
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
					minHeight: '400px',
					maxHeight: '800px',
					overflowY: 'auto',
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					{renderModalContent()}
				</LocalizationProvider>
			</Box>
		</Modal>
	)
}
