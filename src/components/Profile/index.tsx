import { getUser } from '@/api/user/route'
import AuthProvider from '../common/AuthProvider'
import ProfileInfo from './ProfileInfo'

export default async function Profile() {
	const user = await getUser()
	console.log('user', user)
	return (
		<AuthProvider user={user}>
			<ProfileInfo profile={user} />
		</AuthProvider>
	)
}
