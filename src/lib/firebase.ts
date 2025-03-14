import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import config from '@/config'

const firebaseConfig = {
	apiKey: config.FIREBASE.API_KEY,
	authDomain: config.FIREBASE.AUTH_DOMAIN,
	projectId: config.FIREBASE.PROJECT_ID,
	storageBucket: config.FIREBASE.STORAGE_BUCKET,
	messagingSenderId: config.FIREBASE.MESSAGING_SENDER_ID,
	appId: config.FIREBASE.APP_ID,
	measurementId: config.FIREBASE.MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }
