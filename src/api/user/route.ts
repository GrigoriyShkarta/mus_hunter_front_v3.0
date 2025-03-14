'use server'

import { URL } from '@/lib/apiURLs'
import { ICheckEmail } from './dto'
import config from '@/config'
import { StorageToken } from '@/lib/constants'
import { cookies } from 'next/headers'
import { IUser } from '@/lib/globalTypes'

const { API_URL } = config

export async function googleAuth(dto: ICheckEmail): Promise<boolean> {
	const response = await fetch(`${API_URL}/${URL.GoogleAuth}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	})

	if (!response.ok) {
		return false
	}

	const data = await response.json()
	return data
}

export async function getUser(): Promise<IUser> {
	const cookieStore = cookies()
	const authToken = (await cookieStore).get(StorageToken)?.value

	const response = await fetch(`${API_URL}/${URL.GetUser}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: authToken ? `Bearer ${authToken}` : '',
		},
		credentials: 'include',
	})

	console.log('response', response)

	// 	if (response.status === 401 && authToken) {
	// 		const newToken = await refreshToken(authToken)
	// 		authToken = newToken
	//
	// 		response = await fetch(`${API_URL}/${URL.GetUser}`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${authToken}`,
	// 			},
	// 			credentials: 'include',
	// 		})
	// 	}

	const data = await response.json()
	console.log('data', data)
	return data
}

async function refreshToken(oldToken: string): Promise<string> {
	const response = await fetch(`${API_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: oldToken }),
	})

	const data = await response.json()
	return data.token
}
