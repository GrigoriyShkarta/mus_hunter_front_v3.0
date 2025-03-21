'use client'

import { useUserStore } from '@/store/userStore'
import { ReactNode, useEffect, useState } from 'react'
import { getUser } from '@/api/user/route'
import Cookies from 'js-cookie'
import { auth } from '@/lib/firebase'
import { StorageToken } from '@/lib/constants'
import { onAuthStateChanged } from 'firebase/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IUser } from '@/lib/globalTypes'

interface AuthProviderProps {
	children: ReactNode
	user?: IUser
}

export default function AuthProvider({ children, user }: AuthProviderProps) {
	const setUser = useUserStore(state => state.setUser)
	const [queryClient] = useState(() => new QueryClient())

	useEffect(() => {
		// 		const unsubscribe = onAuthStateChanged(auth, async user => {
		// 			if (user) {
		// 				const token = await user.getIdToken()
		// 				Cookies.set(StorageToken, token)
		//
		// 				try {
		// 					const userData = await getUser()
		// 					if (userData && userData.id === user.uid) {
		// 						setUser(userData)
		// 					}
		// 				} catch (error) {
		// 					setUser(null)
		// 					console.error('Failed to fetch user:', error)
		// 				}
		// 			} else {
		// 				setUser(null)
		// 				Cookies.remove(StorageToken)
		// 				console.log('User is logged out')
		// 			}
		// 		})
		const authUser = auth.currentUser
		const token = authUser?.getIdToken()

		if (token && user) {
			setUser(user)
		}

		// return () => unsubscribe()
	}, [user])

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
