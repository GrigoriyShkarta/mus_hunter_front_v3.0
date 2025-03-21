'use client'

import { useUserStore } from '@/store/userStore'
import { IconButton } from '@mui/material'
import { useImperativeHandle, useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import MainModal from '../modals/Modal'
import { ModalType } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { getCommonData } from './commonData'

interface EditProps {
	isUser: boolean
	type: ModalType
	positionAbsolute?: boolean
	hiddenIcon?: boolean
	selectedObject?: number
	id?: string
	ref?: any
}

export default function Edit({
	isUser,
	id,
	type,
	ref,
	selectedObject,
	positionAbsolute = false,
	hiddenIcon = false,
}: EditProps) {
	const [open, setOpen] = useState(false)
	const user = useUserStore(state => state.user)

	useImperativeHandle(ref, () => ({
		openModal: handleOpen,
	}))

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { data: commonData } = useQuery({
		queryKey: ['settings-common'],
		queryFn: getCommonData,
		refetchOnWindowFocus: false,
		placeholderData: {
			cities: [],
			styles: [],
			skills: [],
		},
	})

	return (
		<>
			{user?.id === id && (
				<IconButton
					size='small'
					onClick={handleOpen}
					sx={{
						display: hiddenIcon ? 'none' : 'block',
						position: positionAbsolute ? 'absolute' : 'initial',
						right: '24px',
						top: '24px',
					}}
				>
					<TbEdit size={24} />
				</IconButton>
			)}

			<MainModal
				open={open}
				handleClose={handleClose}
				type={type}
				selectedId={selectedObject}
				commonData={commonData}
			/>
		</>
	)
}
