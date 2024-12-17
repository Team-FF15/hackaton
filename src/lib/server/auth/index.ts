import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from '@/server/db';
import { dev } from '$app/environment';
import type { User } from '@prisma/client';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

// lucia auth, check https://v3.lucia-auth.com/basics/configuration for configuration
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

type DatabaseUserAttributes = Omit<User, 'password_hash'>;
