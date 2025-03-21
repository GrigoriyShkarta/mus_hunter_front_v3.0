'use client'

import { useUserStore } from '@/store/userStore'
import { Avatar, AvatarGroup } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Links() {
	const profile = useUserStore(state => state.user)
	const [favicons, setFavicons] = useState<string[]>()

	const getFaviconUrl = async (url: string) => {
		const domain = new URL(url).hostname
		return await `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
	}

	useEffect(() => {
		const fetchFavicons = async (urlArray: string[]) => {
			const faviconUrls = await Promise.all(
				urlArray.map(async link => await getFaviconUrl(link))
			)
			setFavicons(faviconUrls)
		}

		if (profile?.links) {
			fetchFavicons(profile.links)
		}
	}, [profile])

	return (
		<AvatarGroup
			sx={{
				flexDirection: 'row',
				position: 'absolute',
				gap: 0.5,
				right: '6px',
				bottom: '6px',
			}}
		>
			{favicons?.map((link, idx) => (
				<Link
					key={link}
					href={profile?.links?.[idx] ?? ''}
					target='_blank'
					rel='noopener noreferrer'
				>
					<Avatar
						src={link}
						sx={{ width: 24, height: 24, border: 'none !important' }}
					/>
				</Link>
			))}
		</AvatarGroup>
	)
}
