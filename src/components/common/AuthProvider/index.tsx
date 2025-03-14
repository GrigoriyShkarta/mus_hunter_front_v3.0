'use client'

import { useUserStore } from '@/store/userStore'
import { ReactNode, useEffect } from 'react'
import { getUser } from '@/api/user/route'
import Cookies from 'js-cookie'
import { auth } from '@/lib/firebase'
import { StorageToken } from '@/lib/constants'
import { onAuthStateChanged } from 'firebase/auth'

interface AuthProviderProps {
	children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const setUser = useUserStore(state => state.setUser)

	useEffect(() => {
		// Подписываемся на изменения состояния аутентификации
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				// Пользователь авторизован
				const token = await user.getIdToken()
				Cookies.set(StorageToken, token)

				// Получаем данные пользователя
				try {
					const userData = await getUser()
					if (userData && userData.id === user.uid) {
						setUser(userData)
					}
				} catch (error) {
					setUser(null)
					console.error('Failed to fetch user:', error)
				}
			} else {
				// Пользователь не авторизован
				setUser(null)
				Cookies.remove(StorageToken)
				console.log('User is logged out')
			}
		})

		// Отписываемся при размонтировании компонента
		return () => unsubscribe()
	}, [setUser])

	return <>{children}</>
}
