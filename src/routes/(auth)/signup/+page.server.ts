import { registerSchema } from '@/schemas/auth.js';
import { lucia } from '@/server/auth';
import { createUser, isEmailTaken, isUsernameTaken } from '@/server/db/user.js';
import { hash } from '@node-rs/argon2';
import { redirect } from 'sveltekit-flash-message/server';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	if (event.locals.session !== null) return redirect(302, '/');

	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (await isUsernameTaken(form.data.username))
			return setError(form, 'username', 'Username already taken');

		if (await isEmailTaken(form.data.email)) return setError(form, 'email', 'Email already taken');

		const password_hash = await hash(form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const user = await createUser({
			username: form.data.username,
			email: form.data.email,
			password_hash
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		const message = {
			type: 'success',
			message: `Welcome back ${user.username}!`
		} as const;
		redirect('/dashboard', message, event);
	}
};
