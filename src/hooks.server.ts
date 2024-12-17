import type { Handle } from '@sveltejs/kit';
import { i18n } from '@/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { lucia } from '@/server/auth';
import { securityHeaders, rules } from '@islamzaoui/securekit';
import { env } from '$env/dynamic/private';

const handleParaglide: Handle = i18n.handle();

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const handleSecurityHeaders = securityHeaders({
	headers: {
		...rules.defaultHeaders,
		'Access-Control-Allow-Origin': env.ORIGIN
	}
}).handle;

export const handle: Handle = sequence(handleParaglide, handleAuth, handleSecurityHeaders);
