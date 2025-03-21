import { apiCommonData } from '@/lib/fetch'

export const commonDataBlocks = {
	styles: 'styles',
	cities: 'cities',
	skills: 'skills',
}

export const getCommonData = () => apiCommonData(commonDataBlocks)
