import { IUser } from '@/lib/globalTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface State {
	user: IUser | null
}

interface Actions {
	setUser: (user: IUser | null) => void
}

const initialState = {
	user: null,
}

export const useUserStore = create<State & Actions>()(
	persist(
		immer(set => ({
			...initialState,
			setUser: data =>
				set(state => {
					state.user = data
				}),
		})),
		{
			name: 'musUser',
			partialize: state => ({
				user: state.user,
			}),
		}
	)
)
