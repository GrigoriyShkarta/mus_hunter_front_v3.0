'use client'
import axios from 'axios'
// import { useAuthStore } from '@/zustand/authStore';
import config from '@/config'
import { useUserStore } from '@/store/userStore'

const { API_URL } = config

const apiClient = axios.create({
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
})

apiClient.defaults.withCredentials = true

apiClient.interceptors.request.use(
	request => {
		request.withCredentials = true
		const token = useUserStore.getState().token
		if (!request.headers.Authorization && token) {
			request.headers.Authorization = 'Bearer ' + token
		}
		return request
	},
	function (error) {
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (error.response.status !== 401 || originalRequest._retry) {
			return Promise.reject(error)
		}
		originalRequest._retry = true
		try {
			const token = useUserStore.getState().token
			if (token) {
				const response = await fetch(`${API_URL}/auth/refresh`, {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				})
				const result = await response.json()
				const { token: newToken } = result
				originalRequest.headers.Authorization = 'Bearer ' + newToken
				useUserStore.getState().setToken(newToken)
			}
			return apiClient(originalRequest)
		} catch (refreshError) {
			// useUserStore.getState().logout()
			return Promise.reject(refreshError)
		}
	}
)

export default apiClient
