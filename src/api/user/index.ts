import { URL } from '@/lib/apiURLs'
import apiClient from '../axiosInstance'
import { ICheckEmail } from './dto'

export async function googleAuth(dto: ICheckEmail): Promise<boolean> {
	const response = await apiClient.post(URL.GoogleAuth, dto)
	return response.data
}
