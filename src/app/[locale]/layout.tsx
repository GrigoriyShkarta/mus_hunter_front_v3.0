import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/lib/theme";
import { Container, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import MainHeader from "@/components/MainHeader";

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: "en" | "ua" };
}) {
	if (!routing.locales.includes(locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider messages={messages}>
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Stack gap={4}>
								<MainHeader />
								<Container maxWidth="lg">{children}</Container>
							</Stack>
						</ThemeProvider>
					</AppRouterCacheProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
