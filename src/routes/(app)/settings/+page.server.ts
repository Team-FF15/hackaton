import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { resetEmailSchema, resetPasswordSchema, resetUsernameSchema } from '@/schemas/auth';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { redirect } from 'sveltekit-flash-message/server';
import { isEmailTaken, isUsernameTaken } from '@/server/db/user';
import { prisma } from '@/server/db';
import { hash, verify } from '@node-rs/argon2';

export const load = (async (event) => {
	const { user } = await event.parent();
	if (user === null) return redirect(302, '/');
	return {
		user,
		form: {
			username: await superValidate(zod(resetUsernameSchema), {
				defaults: {
					username: user.username
				}
			}),
			email: await superValidate(zod(resetEmailSchema), {
				defaults: {
					email: user.email
				}
			}),
			password: await superValidate(zod(resetPasswordSchema))
		}
	};
}) satisfies PageServerLoad;

export const actions = {
	username: async (event) => {
		const form = await superValidate(event, zod(resetUsernameSchema));

		if (event.locals.session === null) {
			return fail(401);
		}

		if (!form.valid) return fail(400, { form });

		if (await isUsernameTaken(form.data.username))
			return setError(form, 'username', 'Username already taken');

		await prisma.user.update({
			where: {
				id: event.locals.session.userId
			},
			data: {
				username: form.data.username
			}
		});

		return {
			form
		};
	},
	email: async (event) => {
		const form = await superValidate(event, zod(resetEmailSchema));

		if (event.locals.session === null) {
			return fail(401);
		}

		if (!form.valid) return fail(400, { form });

		if (await isEmailTaken(form.data.email)) return setError(form, 'email', 'Email already taken');

		await prisma.user.update({
			where: {
				id: event.locals.session.userId
			},
			data: {
				email: form.data.email
			}
		});

		return {
			form
		};
	},
	password: async (event) => {
		const form = await superValidate(event, zod(resetPasswordSchema));

		if (event.locals.session === null || event.locals.user === null) {
			return fail(401);
		}

		if (!form.valid) return fail(400, { form });

		const isValid = await verify(event.locals.user.password_hash, form.data.currentPassword, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!isValid) return setError(form, 'password', 'Password is incorrect');

		const password_hash = await hash(form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await prisma.user.update({
			where: {
				id: event.locals.session.userId
			},
			data: {
				password_hash
			}
		});

		return {
			form
		};
	}
};
