import { getUser } from '@/api/user/route'
import AuthProvider from '../common/AuthProvider'
import ProfileInfo from './ProfileInfo'

export default async function Profile() {
	const user = await getUser()
	return (
		<AuthProvider user={user}>
			<ProfileInfo />
		</AuthProvider>
	)
}
