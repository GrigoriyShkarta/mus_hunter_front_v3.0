import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

export default createMiddleware(routing)

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'

	if (!pathname.startsWith(`/${locale}`)) {
		return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
	}
}

export const config = {
	matcher: ['/', '/(ua|en)/:path*'],
}
