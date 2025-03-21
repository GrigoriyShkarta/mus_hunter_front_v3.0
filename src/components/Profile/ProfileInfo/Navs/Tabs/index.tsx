'use client'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { SyntheticEvent, useState } from 'react'
import Skills from './components/Skills'
import { Stack } from '@mui/material'
import { IUser } from '@/lib/globalTypes'
import InSearch from './components/InSearch'

enum TabValue {
	SKILLS,
	IS_SEARCH,
}

interface Props {
	profile: IUser
}

export default function Navigate({ profile }: Props) {
	const [tabValue, setTabValue] = useState<TabValue>(TabValue.SKILLS)

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}

	const renderTab = () => {
		switch (tabValue) {
			case TabValue.SKILLS:
				return <Skills profile={profile} />
			case TabValue.IS_SEARCH:
				return <InSearch profile={profile} />
		}
	}

	return (
		<Stack gap={1}>
			<Tabs
				value={tabValue}
				onChange={handleChange}
				textColor='secondary'
				indicatorColor='secondary'
				aria-label='secondary tabs example'
				sx={{
					border: '1px solid',
					borderTop: '1px solid rgba(0, 0, 0, 0.12)',
					borderRadius: '0 0 .5rem .5rem',
				}}
			>
				<Tab value={TabValue.SKILLS} label='Skills' />
				<Tab value={TabValue.IS_SEARCH} label='In Search' />
			</Tabs>

			<Stack padding={'16px'} border={'1px solid'} borderRadius={'.5rem'}>
				{renderTab()}
			</Stack>
		</Stack>
	)
}
