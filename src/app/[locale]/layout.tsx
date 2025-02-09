import MainHeader from '@/components/MainHeader'
import Notifications from '@/components/Notification'
import { routing } from '@/i18n/routing'
import theme from '@/lib/theme'
import { Container, CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: 'en' | 'ua' }
}) {
	if (!routing.locales.includes(locale)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Stack gap={4}>
								<MainHeader />
								<Notifications>
									<Container maxWidth='lg'>{children}</Container>
								</Notifications>
							</Stack>
						</ThemeProvider>
					</AppRouterCacheProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
