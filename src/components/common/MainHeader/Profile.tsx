'use client'

import { useUserStore } from '@/store/userStore'
import { Avatar, Button, Toolbar } from '@mui/material'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState, MouseEvent } from 'react'
import { PiSignIn } from 'react-icons/pi'

import { PiUserCircleThin } from 'react-icons/pi'
import ProfileMenu from './ProfileMenu'

export default function Profile() {
	const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
	const t = useTranslations('main')
	const user = useUserStore(state => state.user)
	const openMenu = Boolean(anchorMenuEl)

	return (
		<Toolbar sx={{ padding: '0' }}>
			{user ? (
				user?.avatar ? (
					<Button
						onClick={(event: MouseEvent<HTMLButtonElement>) => {
							setAnchorMenuEl(event.currentTarget)
						}}
						sx={{ p: 0 }}
					>
						<Avatar alt='user' src={user.avatar} />
					</Button>
				) : (
					<PiUserCircleThin size={34} />
				)
			) : (
				<Button
					variant='text'
					color='secondary'
					endIcon={<PiSignIn />}
					sx={{ color: 'white' }}
				>
					<Link href={'/'}>{t('sign_in')}</Link>
				</Button>
			)}

			<ProfileMenu
				open={openMenu}
				anchorEl={anchorMenuEl}
				handleClose={() => {
					setAnchorMenuEl(null)
				}}
				user={user}
			/>
		</Toolbar>
	)
}
