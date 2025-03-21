import config from '@/config'
import { auth } from './firebase'

const { API_URL } = config

export async function apiUpdateData(url: string, data?: any, file = false) {
	const user = auth.currentUser
	const token = await user?.getIdToken()

	try {
		const body = file ? data : JSON.stringify(data)

		const result = await fetch(`${API_URL}/${url}`, {
			method: 'PUT',
			headers: {
				...(file ? {} : { 'Content-Type': 'application/json' }),
				Authorization: `Bearer ${token}`,
			},
			body: body || '{}',
		})

		const resultData = await result.json()
		return resultData
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function apiCreateData(url: string, data?: any, file = false) {
	const user = auth.currentUser
	const token = await user?.getIdToken()

	try {
		const body = file ? data : JSON.stringify(data)

		const result = await fetch(`${API_URL}/${url}`, {
			method: 'POST',
			headers: {
				...(file ? {} : { 'Content-Type': 'application/json' }),
				Authorization: `Bearer ${token}`,
			},
			body: body || '{}',
		})

		const resultData = await result.json()
		return resultData
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function apiDeleteData(url: string, id: number | string) {
	const user = auth.currentUser
	const token = await user?.getIdToken()

	try {
		const result = await fetch(`${API_URL}/${url}/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const resultData = await result.json()
		return resultData
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function apiGetData(url: string) {
	try {
		const response = await fetch(`${API_URL}/settings/${url}`)
		if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`)
		return await response.json()
	} catch (error) {
		console.error(`Ошибка запроса к ${url}:`, error)
		throw error
	}
}

export async function apiCommonData(data: Record<string, string>) {
	try {
		const requests = Object.entries(data).map(async ([key, endpoint]) => {
			const response = await apiGetData(endpoint)
			return { [key]: response }
		})

		const results = await Promise.all(requests)

		return results.reduce((acc, curr) => ({ ...acc, ...curr }), {})
	} catch (error) {
		console.error('Ошибка при получении общих данных:', error)
		throw error
	}
}
