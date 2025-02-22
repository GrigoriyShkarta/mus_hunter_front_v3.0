import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface State {
	token: string | null
}

interface Actions {
	setToken: (token: string) => void
}

const initialState = {
	token: null,
}

export const useUserStore = create<State & Actions>()(
	persist(
		immer(set => ({
			...initialState,
			setToken: token =>
				set(state => {
					state.token = token
				}),
		})),
		{
			name: 'musUser',
			partialize: state => ({
				token: state.token,
			}),
		}
	)
)
