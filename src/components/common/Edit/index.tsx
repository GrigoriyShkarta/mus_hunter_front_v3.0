'use client'

import { useUserStore } from '@/store/userStore'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import MainModal from '../modals/Modal'
import { ModalType } from '@/lib/constants'

interface EditProps {
	isUser: boolean
	id: string
	type: ModalType
}

export default function Edit({ isUser, id, type }: EditProps) {
	const [open, setOpen] = useState(false)
	const user = useUserStore(state => state.user)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<>
			{user?.id === id && (
				<IconButton
					size='small'
					onClick={handleOpen}
					sx={{
						position: 'absolute',
						right: '24px',
						top: '24px',
					}}
				>
					<TbEdit size={24} />
				</IconButton>
			)}

			<MainModal open={open} handleClose={handleClose} type={type} />
		</>
	)
}
