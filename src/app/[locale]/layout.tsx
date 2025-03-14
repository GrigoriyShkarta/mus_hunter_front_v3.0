import MainHeader from '@/components/common/MainHeader'
import Notifications from '@/components/common/Notification'
import { routing } from '@/i18n/routing'
import theme from '@/lib/theme'
import { Container, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import AuthProvider from '@/components/common/AuthProvider'
import '../globals.css'

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	if (!routing.locales.includes(locale as 'ua' | 'en')) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body>
				<AuthProvider>
					<NextIntlClientProvider messages={messages}>
						<AppRouterCacheProvider>
							<ThemeProvider theme={theme}>
								<CssBaseline />
								<Stack gap={4}>
									<MainHeader />
									<Notifications>
										<Container
											maxWidth='lg'
											sx={{ height: 'calc(100vh - 96px)', minHeight: '500px' }}
										>
											{children}
										</Container>
									</Notifications>
								</Stack>
							</ThemeProvider>
						</AppRouterCacheProvider>
					</NextIntlClientProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
