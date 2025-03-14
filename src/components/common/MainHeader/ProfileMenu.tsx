'use client'

import { IUser } from '@/lib/globalTypes'
import { useUserStore } from '@/store/userStore'
import { Menu, Fade, Button, MenuList, Divider, Avatar } from '@mui/material'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { StorageToken } from '@/lib/constants'
import { redirect } from 'next/navigation'

interface ProfileMenuProps {
	open: boolean
	anchorEl: HTMLElement | null
	user: IUser | null
	handleClose: () => void
}

export default function ProfileMenu({
	open,
	anchorEl,
	user,
	handleClose,
}: ProfileMenuProps) {
	const setUser = useUserStore(state => state.setUser)
	const locale = useLocale()

	const logout = () => {
		setUser(null)
		Cookies.remove(StorageToken)
		redirect('/')
	}

	return (
		<Menu
			id='fade-Edits'
			MenuListProps={{
				'aria-labelledby': 'fade-button',
			}}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			TransitionComponent={Fade}
			slotProps={{
				paper: {
					sx: {
						width: 250,
						maxHeight: '80%',
						padding: '8px',
					},
				},
			}}
		>
			<MenuList
				sx={{
					padding: '0',
				}}
			>
				<Button
					fullWidth
					startIcon={
						<Avatar src={user?.avatar} sx={{ width: '32px', height: '32px' }} />
					}
					sx={{
						justifyContent: 'flex-start',
						textAlign: 'left',
					}}
				>
					<Link href={`/${locale}/user/${user?.id}`}>my profile</Link>
				</Button>
			</MenuList>
			<Divider />
			<Button
				fullWidth
				startIcon={<BiLogOut />}
				sx={{
					justifyContent: 'flex-start',
					textAlign: 'left',
					paddingLeft: '8px',
				}}
				onClick={logout}
			>
				logout
			</Button>
		</Menu>
	)
}
